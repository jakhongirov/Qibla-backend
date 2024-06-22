const model = require('./model')

module.exports = {
   GET: async (req, res) => {
      try {
         const { user_id } = req.params
         const foundUser = await model.foundUser(user_id)

         if (foundUser && foundUser?.user_country_code == "uz") {
            return res.status(200).json({
               status: 200,
               message: "Success",
               data: {
                  click: `https://my.click.uz/services/pay?merchant_id=26420&service_id=34442&amount=1000&transaction_param=Qiblah&additional_param3=${foundUser?.user_id}&additional_param4=`,
                  uzum: ""
               }
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