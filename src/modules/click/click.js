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
            const foundPayment = await model.foundPayment(param3);
            const today = new Date();
            const expiresDate = new Date(today);
            const monthToAdd = Number(foundPayment?.month);
            let targetMonth = today.getMonth() + monthToAdd;
            let targetYear = today.getFullYear();

            while (targetMonth > 11) {
               targetMonth -= 12;
               targetYear++;
            }

            expiresDate.setFullYear(targetYear, targetMonth, 1);
            const maxDaysInTargetMonth = new Date(targetYear, targetMonth + 1, 0).getDate();
            expiresDate.setDate(Math.min(today.getDate(), maxDaysInTargetMonth));
            
            if (expiresDate < today) {
               expiresDate.setMonth(expiresDate.getMonth() + 1);
               expiresDate.setDate(0); 
            }
            const formattedDate = `${String(expiresDate.getDate()).padStart(2, '0')}.${String(expiresDate.getMonth() + 1).padStart(2, '0')}.${expiresDate.getFullYear()}`;
            
            console.log(formattedDate)
            console.log(foundPayment)

            await model.editUserPremium(param2, formattedDate)
            await model.addTransaction(click_trans_id, amount, monthToAdd, param2, merchant_trans_id, error, error_note)
         }

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