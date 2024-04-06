const express = require("express")
const router = express.Router()

//Middlawares
const { AUTH } = require('../middleware/auth')
const FileUpload = require('../middleware/multer')

// files
const admin = require('./admin/admin')
const users = require('./users/users')
const usersStats = require('./userStats/userStats')
const priceList = require('./priceList/priceList')
const categories = require('./categories/categories')
// const questions = require('./questions/questions')
const names = require('./names/names')
const quran = require('./quran/quran')
const verses = require('./verses/verses')
const authors = require('./authors/authors')
const audios = require('./audios/audios')
const zikrs = require('./zikr/zikr')
const publicZikrs = require('./publicZikr/publicZikr')
const news = require('./news/news')
const tapes = require('./tapes/tapes')
const versions = require('./versions/versions')
const meditationCategories = require('./meditation/categories')
const meditationItems = require('./meditation/items')
const additionalVotes = require('./votes/votes')

router

   // ADMIN API
   .get('/admin/list', AUTH, admin.GET_ADMIN)
   .post('/admin/register', admin.REGISTER_ADMIN)
   .post('/admin/login', admin.LOGIN_ADMIN)
   .put('/admin/edit', AUTH, admin.EDIT_ADMIN)
   .delete('/admin/delete', AUTH, admin.DELETE_ADMIN)

   // USERS API
   .get('/users/list', AUTH, users.GET_ADMIN)
   .get('/users/count', AUTH, users.GET_USER_COUNT)
   .get('/users/premium/list', AUTH, users.GET_PREMIUM_USERS)
   .get('/user/:id', users.GET_ID)
   .get('/user/token/:token', users.GET_TOKEN)
   .post('/user/phone', users.GET_BY_PHONE)
   .post('/user/register', users.REGISTER_USER)
   .post('/user/register/temporaryuser', users.TEMPORARY_USER)
   .post('/user/login/:contact', users.LOGIN_USER)
   .put('/user/edit/avatar/:user_id', AUTH, FileUpload.single("photo"), users.EDIT_USER_AVATAR)
   .put('/user/edit/contact', AUTH, users.EDIT_USER_CONTACT)
   .put('/user/edit/name', AUTH, users.EDIT_USER_NAME)
   .put('/user/edit/location', AUTH, users.EDIT_USER_LOCATION)
   .put('/user/edit/phone-details', AUTH, users.EDIT_USER_PHONE_DETAILS)
   .put('/user/edit/about', AUTH, users.EDIT_USER_COMMENT)
   .put('/user/edit/premium', AUTH, users.EDIT_USER_PREMIUM)
   .put('/user/edit/applang', AUTH, users.CHANGE_LANG)
   .put('/user/edit/alldata', AUTH, users.EDIT_ALL_USER_DATE)
   .delete('/user/delete', AUTH, users.DELETE_USER)
   .delete('/user/admin/delete', AUTH, users.DELETE_USER_ADMIN)

   // USERS STATS API
   .get("/users/stats/list", AUTH, usersStats.GET_ADMIN)
   .get("/user/stats/:user_id", AUTH, usersStats.GET_USER_ID)
   .post("/user/stats/add", AUTH, usersStats.CREATE_USER_STATS)
   .delete("/user/stats/delete", AUTH, usersStats.DELETE_USER_STATS)

   // PRICE ITEM API
   .get('/prices/admin/list', AUTH, priceList.GET_ADMIN)
   .get('/prices/list', priceList.GET)
   .get('/prices/:id', priceList.GET_ID)
   .post('/price/item/add', AUTH, priceList.ADD_PRICE_ITEM)
   .put('/price/item/edit', AUTH, priceList.EDIT_PRICE_ITEM)
   .delete('/price/item/delete', AUTH, priceList.DELETE_PRICE_ITEM)

   // CATEGORIES API
   .get('/categories/list', categories.GET)
   .get('/category/:id', categories.GET_ID)
   .get('/category/file/add', AUTH, categories.ADD_FILE)
   .post('/category/add', FileUpload.single("photo"), AUTH, categories.ADD_CATEGORY)
   .put('/category/edit', FileUpload.single("photo"), AUTH, categories.EDIT_CATEGORY)
   .delete('/category/delete', AUTH, categories.DELETE_CATEGORY)

   // ZIKRS API
   .get('/zikr/list', zikrs.GET)
   .get('/zikr/:id', zikrs.GET_ID)
   .get('/zikr/file/add', AUTH, zikrs.ADD_FILE)
   .post('/zikr/add', AUTH, FileUpload.single("audio"), zikrs.ADD_ZIKR)
   .put('/zikr/edit', AUTH, FileUpload.single("audio"), zikrs.EDIT_ZIKR)
   .delete('/zikr/delete', AUTH, zikrs.DElETE_ZIKR)

   // PUBLIC ZIKRS API
   .get('/public/zikr/list', publicZikrs.GET)
   .get('/public/zikr/:id', publicZikrs.GET_ID)
   .post('/public/zikr/add', FileUpload.single("audio"), AUTH, publicZikrs.ADD_PUBLIC_ZIKR)
   .put('/public/zikr/edit', FileUpload.single("audio"), AUTH, publicZikrs.EDIT_PUBLIC_ZIKR)
   .put('/public/zikr/edit/participants', publicZikrs.EDIT_PARTICIPANTS)
   .put('/public/zikr/edit/count/:id', publicZikrs.EDIT_COUNT)
   .put('/public/zikr/edit/finishing', AUTH, publicZikrs.EDIT_FINISHING)
   .delete('/public/zikr/delete', AUTH, publicZikrs.DELETE_PUBLIC_ZIKR)

   // // QUESTION API
   // .get('/questions/list', AUTH, questions.GET)
   // .get('/questions/category/:categoryId', questions.GET_CATEGORY)
   // .get('/question/:id', questions.GET_ID)
   // .post('/question/add', AUTH, questions.ADD_QUESTION)
   // .put('/question/edit', AUTH, questions.EDIT_QUESTION)
   // .delete('/question/delete', AUTH, questions.DELETE_QUESTION)

   // NAMES API
   .get('/names/list', names.GET)
   .get('/name/:id', names.GET_ID)
   .get('/name/file/add', AUTH, names.ADD_FILE)
   .post('/name/add', AUTH, FileUpload.single("audio"), names.ADD_NAME)
   .put('/name/edit', AUTH, FileUpload.single("audio"), names.EDIT_NAME)
   .delete('/name/delete', AUTH, names.DELETE_NAME)

   // QURAN API
   .get('/quran/list', quran.GET)
   .get('/sura/:id', quran.GET_ID)
   .get('/sura/file/add', AUTH, quran.ADD_FILE)
   .post('/sura/add', AUTH, quran.ADD_SURA)
   .put('/sura/edit', AUTH, quran.EDIT_SURA)
   .delete('/sura/delete', quran.DELETE_SURA)

   // VERSES API
   .get('/verses/list', verses.GET)
   .get('/verses/list/:suraId', verses.GET_SURA)
   .get('/verses/:id', verses.GET_ID)
   .get('/verses/juz/:number', verses.GET_JUZ)
   .get('/verses/file/add', verses.ADD_FILE)
   .post('/verses/add', AUTH, verses.ADD_VERSE)
   .put('/verses/edit', AUTH, verses.EDIT_VERSE)
   .delete('/verses/delete', AUTH, verses.DELETE_VERSE)

   // AUTHORS API
   .get('/authors/list', authors.GET)
   .post('/author/add', AUTH, FileUpload.single("photo"), authors.ADD_AUTHOR)
   .put('/author/edit', AUTH, FileUpload.single("photo"), authors.UPDATE_AUTHOR)
   .delete('/author/delete', AUTH, authors.DELETE_AUTHOR)

   // AUDIOS API
   .get('/audios/list', audios.GET)
   .get('/audio/:sura_id', audios.GET_SURA_ID)
   .post('/audio/add', AUTH, FileUpload.single("audio"), audios.ADD_AUDIO)
   .put('/audio/edit', AUTH, FileUpload.single("audio"), audios.UPDATE_AUDIO)
   .delete('/audio/delete', AUTH, audios.DELETE_AUDIO)

   // NEWS API
   .get('/news/admin/list', AUTH, news.GET_ADMIN)
   .get('/news/list', news.GET)
   .get('/news/:id', news.GET_ID)
   .post('/news/add', AUTH, FileUpload.single("photo"), news.ADD_NEWS)
   .put('/news/edit', AUTH, FileUpload.single("photo"), news.EDIT_NEWS)
   .put('/news/like', news.EDIT_LIKE_COUNT)
   .put('/news/view', news.EDIT_VIEW_COUNT)
   .put('/news/edit/status', AUTH, news.EDIT_STATUS)
   .delete('/news/delete', AUTH, news.DELETE_NEWS)

   // TAPES API
   .get('/tapes/list', tapes.GET)
   .get('/tapes/date', tapes.GET_BY_DATE)
   .get('/tapes/:id', tapes.GET_ID)
   .post('/tapes/add', AUTH, tapes.ADD_TAPE)
   .put('/tapes/edit', AUTH, tapes.EDIT_TYPE)
   .delete('/tapes/delete', AUTH, tapes.DELETE_TAPE)

   // VERSIONS API
   .get('/quran/updated/list', AUTH, versions.GET_ADMIN)
   .post('/quran/updated', versions.GET_UPDATES)
   .post('/quran/updated/add', AUTH, versions.ADD_UPDATED)
   .put('/quran/updated/edit', AUTH, versions.UPDATE_UPDATES)
   .delete('/quran/updated/delete', AUTH, versions.DELETE_QURAN_UPDATES)
   .get('/versions/list', versions.GET_VERSION)
   .post('/versions/add', AUTH, versions.ADD_VERSION)
   .put('/versions/edit', AUTH, versions.UPDATE_VERSION)
   .delete('/versions/delete', AUTH, versions.DELETE_VERSION)

   // MEDITATION CATEGORIES
   .get('/meditation/categories', meditationCategories.GET)
   .post('/meditation/category/add', AUTH, meditationCategories.ADD_CATEGORY)
   .put('/meditation/category/edit', AUTH, meditationCategories.UPDATE_CATEGORY)
   .delete('/meditation/category/delete', AUTH, meditationCategories.DELETE_CATEGORY)

   // MEDITATION ITEMS
   .get('/meditation/items/admin', AUTH, meditationItems.GET_ADMIN)
   .get('/meditation/items', meditationItems.GET_CATEGORIES)
   .post('/meditation/item/add', AUTH, FileUpload.single("audio"), meditationItems.ADD_ITEM)
   .put('/meditation/item/edit', AUTH, FileUpload.single("audio"), meditationItems.UPDATE_ITEM)
   .delete('/meditation/item/delete', AUTH, meditationItems.DELETE_CATEGORY)

   // ADDITIONAL VOTES
   .get('/additional/votes', additionalVotes.GET)
   .post('/additional/vote/add', AUTH, FileUpload.single("audio"), additionalVotes.ADD_VOTE)
   .put('/additional/vote/edit', AUTH, FileUpload.single("audio"), additionalVotes.UPDATE_VOTE)
   .delete('/additional/vote/delete', AUTH, additionalVotes.DELETE_VOTE)

module.exports = router