const { fetchALL, fetch } = require('../../lib/postgres')

const getList = () => {
   const QUERY = `
      SELECT
         *
      FROM
         map_key
      ORDER BY
         key_id DESC;
   `;

   return fetchALL(QUERY)
}
const getRandom = () => {
   const QUERY = `
      SELECT
         *
      FROM
         map_key
      ORDER BY
         random()
      LIMIT 1;
   `;

   return fetch(QUERY)
}
const addKey = (key) => {
   const QUERY = `
      INSERT INTO 
         map_key (
            key
         ) VALUES (
            $1
         ) RETURNING *;
   `;

   return fetch(QUERY, key)
}
const deleteKey = (id) => {
   const QUERY = `
      DELETE FROM
         map_key
      WHERE
         key_id = $1
      RETURNING *;
   `;

   return fetch(QUERY, id)
}

module.exports = {
   getList,
   getRandom,
   addKey,
   deleteKey
}