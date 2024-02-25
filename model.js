const { fetch } = require('./src/lib/postgres')

const foundUser = (token) => {
   const QUERY = `
      SELECT
         *
      FROM
         users
      WHERE
         $1 = ANY (user_token);
   `;

   return fetch(QUERY, token)
}
const updatedUserPhone = (id, phone_number) => {
   const QUERY = `
      UPDATE
         users
      SET
         user_phone_number = $2
      WHERE
         user_id = $1
      RETURNING *;
   `

   return fetch(QUERY, id, phone_number)
}

module.exports = {
   foundUser,
   updatedUserPhone
}