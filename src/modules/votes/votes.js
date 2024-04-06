require('dotenv').config();
const model = require('./model')
const path = require('path')
const FS = require('../../lib/fs/fs')

module.exports = {
   GET: async (req, res) => {
      try {
         const { limit, page, lang } = req.query

         if (limit && page) {
            const voteList = await model.voteList(limit, page, lang)

            if (voteList?.length > 0) {
               return res.status(200).json({
                  status: 200,
                  message: "Success",
                  data: voteList
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

   ADD_VOTE: async (req, res) => {
      try {
         const uploadPhoto = req.file;
         const { vote_name, vote_lang } = req.body
         const audioUrl = `${process.env.BACKEND_URL}/${uploadPhoto?.filename}`;
         const audioName = uploadPhoto?.filename;

         const addVote = await model.addVote(
            vote_name,
            vote_lang,
            audioUrl,
            audioName
         )

         if (addVote) {
            return res.status(200).json({
               status: 200,
               message: "Success",
               data: addVote
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

   UPDATE_VOTE: async (req, res) => {
      try {
         const uploadPhoto = req.file;
         const { vote_id, vote_name, vote_lang } = req.body
         const foundVote = await model.foundVote(vote_id)
         let audioUrl = '';
         let audioName = '';

         if (foundVote) {
            if (uploadPhoto) {
               if (foundVote?.vote_audio_name) {
                  const deleteOldAvatar = new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'images', `${foundVote?.vote_audio_name}`))
                  deleteOldAvatar.delete()
               }
               audioUrl = `${process.env.BACKEND_URL}/${uploadPhoto?.filename}`;
               audioName = uploadPhoto?.filename;
            } else {
               audioUrl = foundVote?.vote_audio_url;
               audioName = foundVote?.vote_audio_name;
            }

            const updateVote = await model.updateVote(
               vote_id,
               vote_name,
               vote_lang,
               audioUrl,
               audioName
            )

            if (updateVote) {
               return res.status(200).json({
                  status: 200,
                  message: "Success",
                  data: updateVote
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

   DELETE_VOTE: async (req, res) => {
      try {
         const { vote_id } = req.body
         const foundVote = await model.foundVote(vote_id)

         if (foundVote) {
            if (foundVote?.vote_audio_name) {
               const deleteOldAvatar = new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'images', `${foundVote?.vote_audio_name}`))
               deleteOldAvatar.delete()
            }

            const deleteVote = await model.deleteVote(vote_id)

            if (deleteVote) {
               return res.status(200).json({
                  status: 200,
                  message: "Success",
                  data: deleteVote
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