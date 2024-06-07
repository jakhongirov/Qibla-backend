const model = require('./model')

module.exports = {
   Prepare: async (req, res) => {
      try {
         const { click_trans_id, amount, param2, param3, merchant_trans_id, error, error_note } = req.body
         let code = '';

         const makeCode = (length) => {
            let characters = '0123456789';
            let charactersLength = characters.length;
            for (let i = 0; i < length; i++) {
               code += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
         }


         if (error_note === 'Success') {
            const today = new Date();
            const expiresDate = new Date(today);
            expiresDate.setMonth(today.getMonth() + Number(param3));
            if (expiresDate.getDate() < today.getDate()) {
               expiresDate.setDate(0);
            }
            const timestamp = expiresDate.getTime();

            // const editUserPremium = await model.editUserPremium(param2, timestamp)
            // const addTransaction = await model.addTransaction(click_trans_id, amount, param3, param2, merchant_trans_id, error, error_note)
         }

         console.log(req.body)

         makeCode(4)

         return res.status(200).json({
            merchant_prepare_id: code,
            merchant_trans_id: merchant_trans_id,
            click_trans_id: click_trans_id,
            error: error,
            error_note: error_note
         })

      } catch (error) {
         console.log(err)
         res.status(500).json({
            status: 500,
            message: "Internal Server Error",
         })
      }
   },

   Complete: async (req, res) => {
      try {
         const { click_trans_id, merchant_trans_id, error, error_note } = req.body

         return res.status(200).json({
            merchant_prepare_id: 5,
            merchant_trans_id: merchant_trans_id,
            click_trans_id: click_trans_id,
            merchant_confirm_id: null,
            error: error,
            error_note: error_note
         })
      } catch (error) {
         console.log(err)
         res.status(500).json({
            status: 500,
            message: "Internal Server Error",
         })
      }
   }
}