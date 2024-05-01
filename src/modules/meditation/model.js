const { fetchALL, fetch } = require('../../lib/postgres')

// categories

const categoriesListByLang = (lang) => {
   const QUERY = `
      SELECT
         *
      FROM
         meditation_categories
      WHERE
         category_lang = $1
      ORDER BY
         category_id DESC;
   `

   return fetchALL(QUERY, lang)
}
const categoriesList = () => {
   const QUERY = `
      SELECT
         *
      FROM
         meditation_categories
      ORDER BY
         category_id DESC;
   `

   return fetchALL(QUERY)
}
const addCategory = (
   category_name,
   category_lang
) => {
   const QUERY = `
      INSERT INTO
         meditation_categories (
            category_name,
            category_lang
         ) VALUES (
            $1,
            $2
         ) RETURNING *;
   `;

   return fetch(
      QUERY,
      category_name,
      category_lang
   )
}
const foundCategory = (category_id) => {
   const QUERY = `
      SELECT
         *
      FROM
         meditation_categories
      WHERE
         category_id = $1;
   `;

   return fetch(QUERY, category_id)
}
const updateCategory = (
   category_id,
   category_name,
   category_lang
) => {
   const QUERY = `
      UPDATE
         meditation_categories
      SET
         category_name = $2,
         category_lang = $3
      WHERE
         category_id = $1
      RETURNING *;
   `;

   return fetch(
      QUERY,
      category_id,
      category_name,
      category_lang
   )
}
const deleteCategory = (category_id) => {
   const QUERY = `
      DELETE FROM
         meditation_categories
      WHERE
         category_id = $1
      RETURNING *;
   `;

   return fetch(QUERY, category_id)
}

// items
const itemsListAdmin = (limit, page) => {
   const QUERY = `
      SELECT
         *
      FROM
         meditation_item
      ORDER BY
         item_id DESC
      LIMIT ${limit}
      OFFSET ${Number((page - 1) * limit)};
   `;

   return fetchALL(QUERY)
}
const itemsListByCategory = (category_id) => {
   const QUERY = `
      SELECT
         *
      FROM
         meditation_item
      WHERE
         category_id = $1;
   `;

   return fetchALL(QUERY, category_id)
}
const addItem = (
   item_name,
   item_description,
   category_id,
   audioUrl,
   audioName,
   duration
) => {
   const QUERY = `
      INSERT INTO
         meditation_item (
            item_name,
            item_description,
            category_id,
            item_audio_url,
            item_audio_name,
            item_time
         ) VALUES (
            $1,
            $2,
            $3,
            $4,
            $5,
            $6
         ) RETURNING *;
   `;

   return fetch(
      QUERY,
      item_name,
      item_description,
      category_id,
      audioUrl,
      audioName,
      duration
   )
}
const foundItem = (item_id) => {
   const QUERY = `
      SELECT
         *
      FROM
         meditation_item
      WHERE
      item_id = $1
   `;

   return fetch(QUERY, item_id)
}
const updateItem = (
   item_id,
   item_name,
   item_description,
   category_id,
   audioUrl,
   audioName,
   duration
) => {
   const QUERY = `
      UPDATE
         meditation_item
      SET
         item_name = $2,
         item_description = $3,
         category_id = $4,
         item_audio_url = $5,
         item_audio_name = $6,
         item_time = $7
      WHERE
         item_id = $1
      RETURNING *;
   `;

   return fetch(
      QUERY,
      item_id,
      item_name,
      item_description,
      category_id,
      audioUrl,
      audioName,
      duration
   )
}
const deleteItem = (item_id) => {
   const QUERY = `
      DELETE FROM
         meditation_item
      WHERE
         item_id = $1
      RETURNING *;
   `;

   return fetch(QUERY, item_id)
}

module.exports = {
   // categories
   categoriesListByLang,
   categoriesList,
   addCategory,
   foundCategory,
   updateCategory,
   deleteCategory,

   // items
   itemsListAdmin,
   itemsListByCategory,
   addItem,
   foundItem,
   updateItem,
   deleteItem
}