const { fetch } = require('../../lib/postgres')

const editUserPremium = (param3, timestamp) => {
   const QUERY = `
      UPDATE
         users
      SET
         user_premium = true,
         user_premium_expires_at = $2
      WHERE
         user_id = $1
      RETURNING *;
   `;

   return fetch(QUERY, param3, timestamp)
}

const addTransaction = (
   click_trans_id,
   amount,
   param2,
   param3,
   merchant_trans_id,
   error,
   error_note
) => {
   const QUERY = `
      INSERT INTO
         transactions (
            click_id,
            amount,
            expires_month,
            user_id,
            merchant_id,
            error,
            error_note
         ) VALUES (
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7
         ) RETURNING *;
   `;

   return fetch(
      QUERY,
      click_trans_id,
      amount,
      param2,
      param3,
      merchant_trans_id,
      error,
      error_note
   )
}

module.exports = {
   editUserPremium,
   addTransaction
}