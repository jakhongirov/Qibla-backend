require('dotenv').config()
const express = require("express");
const http = require('http');
const cors = require("cors");
const path = require('path')
const fs = require('fs');
const app = express();
const server = http.createServer(app);
const { PORT } = require("./src/config");
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

const bot = new TelegramBot(process.env.BOT_TOKEN, {
   polling: true
})

bot.on('message', async (msg) => {
   const chatId = msg.chat.id;
   const text = msg.text;
   const [command, ...parameters] = text.split(' ');

   if (command === '/start') {
      const foundUser = await model.foundUser(parameters[0])

      if (foundUser) {
         const content = `
            Assalomu alaykum ${foundUser?.user_name}\nЗдравствуйте ${foundUser?.user_name}
         `;

         bot.sendMessage(chatId, content, {
            reply_markup: {
               inline_keyboard: [
                  [
                     {
                        text: 'Uzbek',
                        callback_data: 'uz'
                     },
                     {
                        text: 'Русский',
                        callback_data: 'ru',
                     },
                  ]
               ]
            }
         })

      } else {
         const content = `
            Assalomu alaykum ${foundUser?.user_name}, Siz ro'yxatda o'ta olmadiz.\nЗдравствуйте ${foundUser?.user_name}, Вы не смогли зарегистрироваться.
         `;

         bot.sendMessage(chatId, content);
      }
   }
});

bot.on('callback_query', async (msg) => {
   const chatId = msg.message.chat.id
   const data = msg.data

   if (data == 'uz') {

      bot.sendMessage(chatId, `${foundUser?.user_name}, kontaktingizni yuboring`, {
         reply_markup: JSON.stringify({
            keyboard:
               [
                  [
                     {
                        text: 'Kontaktni yuborish',
                        request_contact: true,
                        one_time_keyboard: true
                     }
                  ]
               ],
            resize_keyboard: true
         })
      }).then(() => {
         const replyListenerId = bot.on("contact", async (msg) => {
            bot.removeListener(replyListenerId)
            if (msg.contact) {
               const updatedUserPhone = await model.updatedUserPhone(foundUser?.user_id, msg.contact.phone_number)

               if (updatedUserPhone) {
                  bot.sendMessage(msg.chat.id, `Sizning so'rovingiz muvaffaqiyatli qabul qilindi, ilovaga qayting.`)
               }

            }
         })
      })

   } else if (data == "ru") {

      bot.sendMessage(chatId, `${foundUser?.user_name}, отправьте свой контакт`, {
         reply_markup: JSON.stringify({
            keyboard:
               [
                  [
                     {
                        text: 'Отправить контакт',
                        request_contact: true,
                        one_time_keyboard: true
                     }
                  ]
               ],
            resize_keyboard: true
         })
      }).then(() => {
         const replyListenerId = bot.on("contact", async (msg) => {
            bot.removeListener(replyListenerId)
            if (msg.contact) {
               const updatedUserPhone = await model.updatedUserPhone(foundUser?.user_id, msg.contact.phone_number)

               if (updatedUserPhone) {
                  bot.sendMessage(msg.chat.id, `Ваш запрос успешно получен, вернитесь к приложению.`)
               }

            }
         })
      })

   }
})

app.get('/telegrambot', async (req, res) => {
   try {
      return res.send("OK")
   } catch (e) {
      console.log(e)
   }
})

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