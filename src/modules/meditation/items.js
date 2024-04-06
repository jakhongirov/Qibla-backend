require('dotenv').config();
const model = require('./model')
const path = require('path')
const FS = require('../../lib/fs/fs')

module.exports = {
   GET_ADMIN: async (req, res) => {
      try {
         const { limit, page } = req.query

         if (limit && page) {
            const itemsListAdmin = await model.itemsListAdmin(limit, page)

            if (itemsListAdmin?.length > 0) {
               return res.status(200).json({
                  status: 200,
                  message: "Success",
                  data: itemsListAdmin
               })
            } else {
               return res.status(404).json({
                  status: 404,
                  message: "Not found"
               })
            }

         } else {
            return res.status(400).json({
               status: 400,
               message: "Must write limit and page"
            })
         }

      } catch (error) {
         console.log(error);
         res.status(500).json({
            status: 500,
            message: "Interval Server Error"
         })
      }
   },

   GET_CATEGORIES: async (req, res) => {
      try {
         const { category_id } = req.query

         if (category_id) {
            const itemsListByCategory = await model.itemsListByCategory(category_id)

            if (itemsListByCategory?.length > 0) {
               return res.status(200).json({
                  status: 200,
                  message: "Success",
                  data: itemsListByCategory
               })
            } else {
               return res.status(404).json({
                  status: 404,
                  message: "Not found"
               })
            }

         } else {
            return res.status(400).json({
               status: 400,
               message: "Bad request, write category_id"
            })
         }

      } catch (error) {
         console.log(error);
         res.status(500).json({
            status: 500,
            message: "Interval Server Error"
         })
      }
   },

   ADD_ITEM: async (req, res) => {
      try {
         const uploadPhoto = req.file;
         const { item_name, category_id } = req.body
         const audioUrl = `${process.env.BACKEND_URL}/${uploadPhoto?.filename}`;
         const audioName = uploadPhoto?.filename;

         const addItem = await model.addItem(
            item_name,
            category_id,
            audioUrl,
            audioName
         )

         if (addItem) {
            return res.status(200).json({
               status: 200,
               message: "Success",
               data: addItem
            })
         } else {
            return res.status(400).json({
               status: 400,
               message: "Bad request"
            })
         }

      } catch (error) {
         console.log(error);
         res.status(500).json({
            status: 500,
            message: "Interval Server Error"
         })
      }
   },

   UPDATE_ITEM: async (req, res) => {
      try {
         const uploadPhoto = req.file;
         const { item_id, item_name, category_id } = req.body
         const foundItem = await model.foundItem(item_id)
         let audioUrl = '';
         let audioName = '';

         if (foundItem) {
            if (uploadPhoto) {
               if (foundItem?.item_audio_name) {
                  const deleteOldAvatar = new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'images', `${foundItem?.item_audio_name}`))
                  deleteOldAvatar.delete()
               }
               audioUrl = `${process.env.BACKEND_URL}/${uploadPhoto?.filename}`;
               audioName = uploadPhoto?.filename;
            } else {
               audioUrl = foundItem?.item_audio_url;
               audioName = foundItem?.item_audio_name;
            }

            const updateItem = await model.updateItem(
               item_id,
               item_name,
               category_id,
               audioUrl,
               audioName
            )

            if (updateItem) {
               return res.status(200).json({
                  status: 200,
                  message: "Success",
                  data: updateItem
               })
            } else {
               return res.status(400).json({
                  status: 400,
                  message: "Bad request"
               })
            }

         } else {
            return res.status(404).json({
               status: 404,
               message: "Not found"
            })
         }

      } catch (error) {
         console.log(error);
         res.status(500).json({
            status: 500,
            message: "Interval Server Error"
         })
      }
   },

   DELETE_CATEGORY: async (req, res) => {
      try {
         const { item_id } = req.body
         const foundItem = await model.foundItem(item_id)

         if (foundItem) {
            if (foundItem?.item_audio_name) {
               const deleteOldAvatar = new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'images', `${foundItem?.item_audio_name}`))
               deleteOldAvatar.delete()
            }

            const deleteItem = await model.deleteItem(item_id)

            if (deleteItem) {
               return res.status(200).json({
                  status: 200,
                  message: "Success",
                  data: deleteItem
               })
            } else {
               return res.status(400).json({
                  status: 400,
                  message: "Bad request"
               })
            }

         } else {
            return res.status(404).json({
               status: 404,
               message: "Not found"
            })
         }

      } catch (error) {
         console.log(error);
         res.status(500).json({
            status: 500,
            message: "Interval Server Error"
         })
      }
   }
}