const model = require('./model')

// let stringToEncode = "uzum:bank";

// Encode the string to Base64
// let encodedString = btoa(stringToEncode);

module.exports = {
   CHECK: async (req, res) => {
      try {
         const {
            serviceId,
            timestamp,
            params
         } = req.body

         return res.status(200).json({

         })

      } catch (error) {
         console.log(error);
         res.status(500).json({
            status: 500,
            message: "Interval Server Error"
         })
      }
   },

   CREATE: async (req, res) => {
      try {
         const {
            serviceId,
            timestamp,
            transId,
            params,
            amount
         } = req.body

      } catch (error) {
         console.log(error);
         res.status(500).json({
            status: 500,
            message: "Interval Server Error"
         })
      }
   },

   CONFIRM: async (req, res) => {
      try {
         const {
            serviceId,
            timestamp,
            transId,
            paymentSource,
            tariff
         } = req.body

      } catch (error) {
         console.log(error);
         res.status(500).json({
            status: 500,
            message: "Interval Server Error"
         })
      }
   },

   REVERSE: async (req, res) => {
      try {
         const {
            serviceId,
            timestamp,
            transId
         } = req.body

      } catch (error) {
         console.log(error);
         res.status(500).json({
            status: 500,
            message: "Interval Server Error"
         })
      }
   },

   STATUS: async (req, res) => {
      try {
         const {
            serviceId,
            timestamp,
            transId
         } = req.body

      } catch (error) {
         console.log(error);
         res.status(500).json({
            status: 500,
            message: "Interval Server Error"
         })
      }
   }
}