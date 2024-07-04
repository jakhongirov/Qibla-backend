require('dotenv').config()
const express = require("express");
const http = require('http');
const cors = require("cors");
const path = require('path')
const fs = require('fs');
const app = express();
const server = http.createServer(app);
const { PORT } = require("./src/config");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const router = require("./src/modules");
const socket = require('./src/lib/socket')
const TelegramBot = require('node-telegram-bot-api')
const model = require('./model')

const publicFolderPath = path.join(__dirname, 'public');
const imagesFolderPath = path.join(publicFolderPath, 'images');

if (!fs.existsSync(publicFolderPath)) {
   fs.mkdirSync(publicFolderPath);
   console.log('Public folder created successfully.');
} else {
   console.log('Public folder already exists.');
}

if (!fs.existsSync(imagesFolderPath)) {
   fs.mkdirSync(imagesFolderPath);
   console.log('Images folder created successfully.');
} else {
   console.log('Images folder already exists within the public folder.');
}

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

let user;

bot.on('message', async (msg) => {
   const chatId = msg.chat.id;
   const text = msg.text;
   const username = msg.from.first_name;

   console.log(`Received message: ${text} from ${username} (Chat ID: ${chatId})`);

   if (text && text.startsWith('/start') && text.split(' ').length > 1) {
      const parameter = text.split(' ')[1];
      console.log(`Extracted parameter: ${parameter}`);

      try {
         const foundUser = await model.foundUser(parameter);
         user = foundUser;
         user['parameter'] = parameter;

         if (foundUser) {
            const content = `Assalomu alaykum ${foundUser.user_name}\nЗдравствуйте ${foundUser.user_name}`;
            console.log(`User found: ${foundUser.user_name}`);

            bot.sendMessage(chatId, content, {
               reply_markup: {
                  inline_keyboard: [
                     [{ text: 'Uzbek', callback_data: 'uz' }, { text: 'Русский', callback_data: 'ru' }]
                  ]
               }
            });
         } else {
            const content = `Assalomu alaykum ${username}, Siz ro'yxatda o'ta olmadiz.\nЗдравствуйте ${username}, Вы не смогли зарегистрироваться.`;
            console.log(`User not found with parameter: ${parameter}`);

            bot.sendMessage(chatId, content, {
               reply_markup: {
                  keyboard: [
                     [{ text: "Uzbek" }, { text: "Русский" }]
                  ],
                  resize_keyboard: true
               }
            });
         }
      } catch (error) {
         console.error(`Error fetching user: ${error.message}`);
      }
   } else {
      const content = `Assalomu alaykum ${username}\nЗдравствуйте ${username}`;

      bot.sendMessage(chatId, content, {
         reply_markup: {
            keyboard: [
               [{ text: "Uzbek" }, { text: "Русский" }]
            ],
            resize_keyboard: true
         }
      });
   }
});

bot.on("message", async (msg) => {
   const chatId = msg.chat.id;
   const text = msg.text;

   console.log(`Handling text message: ${text} (Chat ID: ${chatId})`);

   if (text === "Uzbek") {
      bot.sendMessage(chatId, 'Qaysi xizmatdan foydalanisiz?', {
         reply_markup: {
            keyboard: [
               [
                  { text: "Savol berish" },
                  { text: "Parolingizni o'zgartiring" },
               ],
               [
                  {
                     text: "Ilovani yuklab olish"
                  }
               ]
            ],
            resize_keyboard: true
         }
      });
   } else if (text === 'Русский') {
      bot.sendMessage(chatId, 'Каким сервисом вы пользуетесь?', {
         reply_markup: {
            keyboard: [
               [
                  { text: "Задайте вопрос" },
                  { text: "Измени пароль" },
               ],
               [
                  {
                     text: "Загрузите приложение"
                  }
               ]
            ],
            resize_keyboard: true
         }
      });
   } else if (text === 'Savol berish' || text === 'Задайте вопрос') {
      const languagePrompt = text === 'Savol berish' ? 'Savol:' : 'Вопрос:';
      bot.sendMessage(chatId, languagePrompt, {
         reply_markup: { force_reply: true }
      }).then((payload) => {
         const replyListenerId = bot.onReplyToMessage(payload.chat.id, payload.message_id, async (msg) => {
            bot.removeReplyListener(replyListenerId);
            if (msg.text) {
               const content = text === 'Savol berish' ? `Savol: ${msg.text}` : `Вопрос: ${msg.text}`;
               await model.addMessage(msg.chat.id, msg.date);
               bot.sendMessage(process.env.CHAT_ID, content);
               bot.sendMessage(chatId, text === 'Savol berish' ? "Sizga tez orada javob berishadi." : "Они скоро вам ответят", {
                  reply_markup: {
                     keyboard: [[{ text: text }]],
                     resize_keyboard: true
                  }
               });
            }
         });
      });
   } else if (text === "Parolingizni o'zgartiring" || text === "Измени пароль") {
      const languageText = text === "Parolingizni o'zgartiring" ? "Kontaktingizni yuboring" : "Отправьте свой контакт";
      const buttonText = text === "Parolingizni o'zgartiring" ? "Kontaktni yuborish" : "Отправить контакт";

      bot.sendMessage(chatId, languageText, {
         reply_markup: {
            keyboard: [[{ text: buttonText, request_contact: true, one_time_keyboard: true }]],
            resize_keyboard: true
         }
      }).then(() => {
         const replyListenerId = bot.on('contact', async (msg) => {
            bot.removeReplyListener(replyListenerId);

            if (msg.contact) {
               let phoneNumber = msg.contact.phone_number;
               if (!phoneNumber.startsWith('+')) {
                  phoneNumber = `+${phoneNumber}`;
               }
               const checkUser = await model.checkUser(phoneNumber);

               if (checkUser) {
                  const promptText = text === "Parolingizni o'zgartiring" ? "Yangi parolingizni yozing!" : "Введите новый пароль!";
                  bot.sendMessage(chatId, promptText, {
                     reply_markup: { force_reply: true }
                  }).then((payload) => {
                     const replyListenerId = bot.onReplyToMessage(payload.chat.id, payload.message_id, async (msg) => {
                        bot.removeReplyListener(replyListenerId);
                        if (msg.text) {
                           const updatedUserPassword = await model.updatedUserPassword(checkUser.user_id, msg.text);
                           if (updatedUserPassword) {
                              const successText = text === "Parolingizni o'zgartiring" ? "Parol muvaffaqiyatli o'rnatildi." : "Пароль успешно установлен.";
                              bot.sendMessage(chatId, successText, {
                                 reply_markup: {
                                    keyboard: [
                                       [
                                          { text: "Savol berish" },
                                          { text: "Parolingizni o'zgartiring" },
                                       ],
                                       [
                                          {
                                             text: "Ilovani yuklab olish"
                                          }
                                       ]
                                    ],
                                    resize_keyboard: true
                                 }
                              });
                           }
                        }
                     })
                  })
               }
            }
         })
      })
   }
});

bot.on('callback_query', async (msg) => {
   const chatId = msg.message.chat.id;
   const data = msg.data;

   if (data === 'uz' || data === 'ru') {
      const languageText = data === 'uz' ? `${user.user_name}, kontaktingizni yuboring` : `${user.user_name}, отправьте свой контакт`;
      const buttonText = data === 'uz' ? 'Kontaktni yuborish' : 'Отправить контакт';

      bot.sendMessage(chatId, languageText, {
         reply_markup: {
            keyboard: [[{ text: buttonText, request_contact: true, one_time_keyboard: true }]],
            resize_keyboard: true
         }
      }).then(() => {
         const replyListenerId = bot.on('contact', async (msg) => {
            bot.removeReplyListener(replyListenerId);
            if (msg.contact) {
               let phoneNumber = msg.contact.phone_number;
               if (!phoneNumber.startsWith('+')) {
                  phoneNumber = `+${phoneNumber}`;
               }
               const checkUser = await model.checkUser(phoneNumber);

               if (checkUser) {
                  const addToken = await model.addToken(checkUser.user_id, user.parameter);

                  if (addToken) {
                     const deleteUser = await model.deleteUser(user.user_id);

                     if (deleteUser) {
                        bot.sendMessage(msg.chat.id, data === 'uz' ? `Sizning so'rovingiz muvaffaqiyatli qabul qilindi, ilovaga qayting.` : `Ваш запрос успешно получен, вернитесь к приложению.`, {
                           reply_markup: {
                              keyboard: [[{ text: data === "uz" ? "Savol berish" : "Задайте вопрос" }]],
                              resize_keyboard: true
                           }
                        });
                     }
                  }
               } else {
                  const updatedUserPhone = await model.updatedUserPhone(user.user_id, phoneNumber);
                  if (updatedUserPhone) {
                     bot.sendMessage(msg.chat.id, data === 'uz' ? `Sizning so'rovingiz muvaffaqiyatli qabul qilindi, ilovaga qayting.` : `Ваш запрос успешно получен, вернитесь к приложению.`, {
                        reply_markup: {
                           keyboard: [[{ text: data === "uz" ? "Savol berish" : "Задайте вопрос" }]],
                           resize_keyboard: true
                        }
                     });
                  }
               }
            }
         });
      });
   }
});

bot.on('message', async (msg) => {
   if (msg.chat.type === 'group' && msg.reply_to_message) {
      const date = msg.reply_to_message.date;
      const foundMsg = await model.foundMsg(date);
      bot.sendMessage(foundMsg.chat_id, `Javob: ${msg.text}`);
   }
});

app.get('/telegrambot', async (req, res) => {
   try {
      return res.send("OK")
   } catch (e) {
      console.log(e)
   }
})

const options = {
   definition: {
      openapi: "3.0.0",
      info: {
         title: "Qiblah API documentation",
         version: "1.0.0",
         description: "by Diyor Jaxongirov",
      },
      servers: [
         {
            url: "https://server.qiblah.app/api/v1",
         },
      ],
   },
   apis: ["./src/modules/index.js"],
};

const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));


app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.resolve(__dirname, 'public')))
app.use('/files', express.static(path.resolve(__dirname, 'files')))
app.use("/api/v1", router);
const io = socket.initializeSocket(server);

server.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});