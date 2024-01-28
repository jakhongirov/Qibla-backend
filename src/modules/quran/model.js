const { fetch, fetchALL } = require('../../lib/postgres')

const quranList = (lang, limit, page) => {
   if (lang == "uzbek") {
      const QUERY = `
         SELECT
            sura_id,
            sura_name_arabic,
            sura_name_uzbek AS name,
            sura_description_uzbek AS description,
            sura_create_at
         FROM
            quran
         ORDER BY
            sura_id
         LIMIT ${limit}
         OFFSET ${Number((page - 1) * limit)}
      `;

      return fetchALL(QUERY)
   } else if (lang == "cyrillic") {
      const QUERY = `
         SELECT
            sura_id,
            sura_name_arabic,
            sura_name_cyrillic AS name,
            sura_description_cyrillic AS description,
            sura_create_at
         FROM
            quran
         ORDER BY
            sura_id
         LIMIT ${limit}
         OFFSET ${Number((page - 1) * limit)}
      `;

      return fetchALL(QUERY)
   } else if (lang == 'russian') {
      const QUERY = `
         SELECT
            sura_id,
            sura_name_arabic,
            sura_name_russian AS name,
            sura_description_russian AS description,
            sura_create_at
         FROM
            quran
         ORDER BY
            sura_id
         LIMIT ${limit}
         OFFSET ${Number((page - 1) * limit)}
      `;

      return fetchALL(QUERY)
   } else if (lang == "english") {
      const QUERY = `
         SELECT
            sura_id,
            sura_name_arabic,
            sura_name_english AS name,
            sura_description_english AS description,
            sura_create_at
         FROM
            quran
         ORDER BY
            sura_id
         LIMIT ${limit}
         OFFSET ${Number((page - 1) * limit)}
      `;

      return fetchALL(QUERY)
   } else if (lang == "kazakh") {
      const QUERY = `
         SELECT
            sura_id,
            sura_name_arabic,
            sura_name_kazakh AS name,
            sura_description_kazakh AS description,
            sura_create_at
         FROM
            quran
         ORDER BY
            sura_id
         LIMIT ${limit}
         OFFSET ${Number((page - 1) * limit)}
      `;

      return fetchALL(QUERY)
   } else {
      const QUERY = `
         SELECT
            *
         FROM
            quran
         ORDER BY
            sura_id
         LIMIT ${limit}
         OFFSET ${Number((page - 1) * limit)}
      `;

      return fetchALL(QUERY)
   }
}
const foundSura = (id, lang) => {
   if (lang == "uzbek") {
      const QUERY = `
         SELECT
            sura_id,
            sura_name_arabic,
            sura_name_uzbek AS name,
            sura_description_uzbek AS description,
            sura_create_at
         FROM
            quran
         WHERE
            sura_id = $1;
      `;

      return fetch(QUERY, id)
   } else if (lang == "cyrillic") {
      const QUERY = `
         SELECT
            sura_id,
            sura_name_arabic,
            sura_name_cyrillic AS name,
            sura_description_cyrillic AS description,
            sura_create_at
         FROM
            quran       
         WHERE
            sura_id = $1;
      `;

      return fetch(QUERY, id)
   } else if (lang == 'russian') {
      const QUERY = `
         SELECT
            sura_id,
            sura_name_arabic,
            sura_name_russian AS name,
            sura_description_russian AS description,
            sura_create_at
         FROM
            quran
         WHERE
            sura_id = $1;
      `;

      return fetch(QUERY, id)
   } else if (lang == "english") {
      const QUERY = `
         SELECT
            sura_id,
            sura_name_arabic,
            sura_name_english AS name,
            sura_description_english AS description,
            sura_create_at
         FROM
            quran
         WHERE
            sura_id = $1;
      `;

      return fetch(QUERY, id)
   } else if (lang == "kazakh") {
      const QUERY = `
         SELECT
            sura_id,
            sura_name_arabic,
            sura_name_kazakh AS name,
            sura_description_kazakh AS description,
            sura_create_at
         FROM
            quran
         WHERE
            sura_id = $1;
      `;

      return fetch(QUERY, id)
   } else {
      const QUERY = `
         SELECT
            *
         FROM
            quran
         WHERE
            sura_id = $1;
      `;

      return fetch(QUERY, id)
   }
}
const addSura = (
   sura_name_arabic,
   sura_name_uzbek,
   sura_description_uzbek,
   sura_name_cyrillic,
   sura_description_cyrillic,
   sura_name_russian,
   sura_description_russian,
   sura_name_english,
   sura_description_english,
   sura_name_kazakh,
   sura_description_kazakh
) => {
   const QUERY = `
      INSERT INTO
         quran (
            sura_name_arabic,
            sura_name_uzbek,
            sura_description_uzbek,
            sura_name_cyrillic,
            sura_description_cyrillic,
            sura_name_russian,
            sura_description_russian,
            sura_name_english,
            sura_description_english,
            sura_name_kazakh,
            sura_description_kazakh
         ) VALUES (
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            $8,
            $9,
            $10,
            $11
         ) RETURNING *;
   `;

   return fetch(
      QUERY,
      sura_name_arabic,
      sura_name_uzbek,
      sura_description_uzbek,
      sura_name_cyrillic,
      sura_description_cyrillic,
      sura_name_russian,
      sura_description_russian,
      sura_name_english,
      sura_description_english,
      sura_name_kazakh,
      sura_description_kazakh
   )
}
const editSura = (
   sura_id,
   sura_name_arabic,
   sura_name_uzbek,
   sura_description_uzbek,
   sura_name_cyrillic,
   sura_description_cyrillic,
   sura_name_russian,
   sura_description_russian,
   sura_name_english,
   sura_description_english,
   sura_name_kazakh,
   sura_description_kazakh
) => {
   const QUERY = `
      UPDATE
         quran
      SET
         sura_name_arabic = $2,
         sura_name_uzbek = $3,
         sura_description_uzbek = $4,
         sura_name_cyrillic = $5,
         sura_description_cyrillic = $6,
         sura_name_russian = $7,
         sura_description_russian = $8,
         sura_name_english = $9,
         sura_description_english = $10,
         sura_name_kazakh = $11,
         sura_description_kazakh = $12
      WHERE
         sura_id = $1
      RETURNING *;
   `;

   return fetch(
      QUERY,
      sura_id,
      sura_name_arabic,
      sura_name_uzbek,
      sura_description_uzbek,
      sura_name_cyrillic,
      sura_description_cyrillic,
      sura_name_russian,
      sura_description_russian,
      sura_name_english,
      sura_description_english,
      sura_name_kazakh,
      sura_description_kazakh
   )
}
const deleteSura = (sura_id) => {
   const QUERY = `
      DELETE FROM
         quran
      WHERE
         sura_id = $1
      RETURNING *;
   `;

   return fetch(QUERY, sura_id)
}

module.exports = {
   quranList,
   foundSura,
   addSura,
   editSura,
   deleteSura
}