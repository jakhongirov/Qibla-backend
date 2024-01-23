const { fetch, fetchALL } = require('../../lib/postgres')

const getTapeList = (limit, page) => {
   const QUERY = `
      SELECT
         *
      FROM
         tapes
      ORDER BY
         tape_id
      LIMIT ${limit}
      OFFSET ${Number((page - 1) * limit)}
   `;

   return fetchALL(QUERY)
}
const foundTape = (id) => {
   const QUERY = `
      SELECT
         *
      FROM
         tapes
      WHERE
         tape_id = $1;
   `;

   return fetch(QUERY, id)
}
const foundZikr = (id) => {
   const QUERY = `
      SELECT
         *
      FROM
         zikrs
      WHERE
         zikr_id = $1;
   `;

   return fetch(QUERY, id)
}
const foundVerse = (id, lang) => {
   if (lang == 'uzbek') {
      const QUERY = `
         SELECT
            verse_id,
            verse_number,
            juz_number,
            juz_divider_text,
            a.sura_id,
            verse_arabic,
            verse_uzbek AS text,
            verse_meaning_uzbek AS meaning,
            verse_create_at
         FROM
            verses a
         INNER JOIN
            quran b
         ON
            a.sura_id = b.sura_id
         WHERE
            verse_id = $1
         ORDER BY
            verse_id;
      `;

      return fetch(QUERY, id)
   } else if (lang == 'cyrillic') {
      const QUERY = `
         SELECT
            verse_id,
            verse_number,
            juz_number,
            juz_divider_text,
            a.sura_id,
            verse_arabic,
            verse_cyrillic AS text,
            verse_meaning_cyrillic AS meaning,
            verse_create_at
         FROM
            verses a
         INNER JOIN
            quran b
         ON
            a.sura_id = b.sura_id
         WHERE
            verse_id = $1
         ORDER BY
            verse_id;
      `;

      return fetch(QUERY, id)
   } else if (lang == 'russian') {
      const QUERY = `
         SELECT
            verse_id,
            verse_number,
            juz_number,
            juz_divider_text,
            a.sura_id,
            verse_arabic,
            verse_russian AS text,
            verse_meaning_russian AS meaning,
            verse_create_at
         FROM
            verses a
         INNER JOIN
            quran b
         ON
            a.sura_id = b.sura_id
         WHERE
            verse_id = $1
         ORDER BY
            verse_id;
      `;

      return fetch(QUERY, id)
   } else if (lang == 'english') {
      const QUERY = `
         SELECT
            verse_id,
            verse_number,
            juz_number,
            juz_divider_text,
            a.sura_id,
            verse_arabic,
            verse_english AS text,
            verse_meaning_english AS meaning,
            verse_create_at
         FROM
            verses a
         INNER JOIN
            quran b
         ON
            a.sura_id = b.sura_id
         WHERE
            verse_id = $1
         ORDER BY
            verse_id;
      `;

      return fetch(QUERY, id)
   } else {
      const QUERY = `
         SELECT
            *
         FROM
            verses a
         INNER JOIN
            quran b
         ON
            a.sura_id = b.sura_id
         WHERE
            verse_id = $1
         ORDER BY
            verse_id;
      `;

      return fetch(QUERY, id)
   }
}
const foundName = (id, lang) => {
   if (lang == 'uzbek') {
      const QUERY = `
         SELECT
            name_id,
            name_arabic,
            name_title_uzbek AS title,
            name_description_uzbek AS description,
            name_translation_uzbek AS translation,
            name_audio_link,
            name_audio_name,
            name_create_at
         FROM
            names_99
         WHERE
            name_id = $1
         ORDER BY
            name_id
      `;

      return fetch(QUERY, id)
   } else if (lang == 'cyrillic') {
      const QUERY = `
         SELECT
            name_id,
            name_arabic,
            name_title_cyrillic AS title,
            name_description_cyrillic AS description,
            name_translation_cyrillic AS translation,
            name_audio_link,
            name_audio_name,
            name_create_at
         FROM
            names_99
         WHERE
            name_id = $1
         ORDER BY
            name_id
      `;

      return fetch(QUERY, id)
   } else if (lang == 'russian') {
      const QUERY = `
         SELECT
            name_id,
            name_arabic,
            name_title_russian AS title,
            name_description_russian AS description,
            name_translation_russian AS translation,
            name_audio_link,
            name_audio_name,
            name_create_at
         FROM
            names_99
         WHERE
            name_id = $1
         ORDER BY
            name_id
      `;

      return fetch(QUERY, id)
   } else if (lang == 'english') {
      const QUERY = `
         SELECT
            name_id,
            name_arabic,
            name_title_english AS title,
            name_description_english AS description,
            name_translation_english AS translation,
            name_audio_link,
            name_audio_name,
            name_create_at
         FROM
            names_99
         WHERE
            name_id = $1
         ORDER BY
            name_id
      `;

      return fetch(QUERY, id)
   } else if (lang == 'kazakh') {
      const QUERY = `
         SELECT
            name_id,
            name_arabic,
            name_title_kazakh AS title,
            name_description_kazakh AS description,
            name_translation_kazakh AS translation,
            name_audio_link,
            name_audio_name,
            name_create_at
         FROM
            names_99
         WHERE
            name_id = $1
         ORDER BY
            name_id
      `;

      return fetch(QUERY, id)
   } else {
      const QUERY = `
         SELECT
            *
         FROM
            names_99
         WHERE
            name_id = $1
         ORDER BY
            name_id
      `;

      return fetch(QUERY, id)
   }
}
const foundNews = (id, lang) => {
   const newsId = id?.map(e => `${e}`).join(', ');

   const QUERY = `
      SELECT
         *
      FROM
         news
      WHERE
         news_id = $1
         and ARRAY[news_id::int] && ARRAY[${newsId}];
   `;

   return fetchALL(QUERY, lang)
}
const addTape = (
   tape_date,
   verse_id,
   zikr_id,
   name_id,
   dua_id,
   news_id
) => {
   const QUERY = `
      INSERT INTO
         tapes (
            tape_date,
            verse_id,
            zikr_id,
            name_id,
            dua_id,
            news_id
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
      tape_date,
      verse_id,
      zikr_id,
      name_id,
      dua_id,
      news_id
   )
}
const editTape = (
   tape_id,
   tape_date,
   verse_id,
   zikr_id,
   name_id,
   dua_id,
   news_id
) => {
   const QUERY = `
      UPDATE
         tapes
      SET
         tape_date = $2,
         verse_id = $3,
         zikr_id = $4,
         name_id = $5,
         dua_id = $6,
         news_id = $7
      WHERE
         tape_id = $1
      RETURNING *;
   `;

   return fetch(
      QUERY,
      tape_id,
      tape_date,
      verse_id,
      zikr_id,
      name_id,
      dua_id,
      news_id
   )
}
const deleteTape = (tape_id) => {
   const QUERY = `
      DELETE FROM
         tapes
      WHERE
         tape_id = $1
      RETURNING *;
   `;

   return fetch(QUERY, tape_id)
}

module.exports = {
   getTapeList,
   foundTape,
   foundZikr,
   foundVerse,
   foundName,
   foundNews,
   addTape,
   editTape,
   deleteTape
}