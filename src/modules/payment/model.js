const { fetch, fetchALL } = require('../../lib/postgres')

const categories = () => {
   const QUERY = `
      SELECT
         *
      FROM
         payment_cateegories
      ORDER BY
         category_id DESC;
   `;

   return fetchALL(QUERY)
}
const addCategory = (category_name, month) => {
   const QUERY = `
      INSERT INTO
         payment_cateegories (
            category_name,
            month
         ) VALUES (
            $1,
            $2
         ) RETURNING *;
   `;

   return fetch(QUERY, category_name, month)
}
const updateCategory = (
   id,
   category_name,
   month
) => {
   const QUERY = `
      UPDATE
         payment_cateegories
      SET
         category_name = $2,
         month = $3
      WHERE
         category_id = $1
      RETURNING *;
   `;

   return fetch(
      QUERY,
      id,
      category_name,
      month
   )
}
const deleteCategory = (id) => {
   const QUERY = `
      DELETE FROM
         payment_cateegories
      WHERE
         category_id = $1
      RETURNING *;
   `;

   return fetch(QUERY, id)
}

module.exports = {
   categories,
   addCategory,
   updateCategory,
   deleteCategory
}