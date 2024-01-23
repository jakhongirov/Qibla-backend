const { fetch, fetchALL } = require('../../lib/postgres')

const quranUpdatesByLimit = (limit, page) => {
   const QUERY = `
      SELECT
         *
      FROM
         quran_updates
      ORDER BY
         version_id DESC
      LIMIT ${limit}
      OFFSET ${Number((page - 1) * limit)};
   `;

   return fetchALL(QUERY)
}
const quranUpdates = () => {
   const QUERY = `
      SELECT
         *
      FROM
         quran_updates
      ORDER BY
         version_id DESC;
   `;

   return fetchALL(QUERY)
}
const getUpdates = (version) => {
   const QUERY = `
      SELECT
         *
      FROM
         quran_updates
      WHERE
         quran_version > $1;
   `;

   return fetchALL(QUERY, version)
}
const getUpdatedVerse = (mergedVerses) => {
   const verseIds = mergedVerses?.map(e => `${e}`).join(', ');

   const QUERY = `
      SELECT
         *
      FROM
         verses
      WHERE
         ARRAY[verse_id::int] && ARRAY[${verseIds}];
   `;

   return fetchALL(QUERY)
}
const addUpdated = (quran_version, verse_id) => {
   const QUERY = `
      INSERT INTO
         quran_updates (
            quran_version,
            verse_id
         ) VALUES (
            $1,
            $2
         ) RETURNING *;
   `;

   return fetch(
      QUERY,
      quran_version,
      verse_id
   )
}
const foundQuranUpdateds = (version_id) => {
   const QUERY = `
      SELECT
         *
      FROM
         quran_updates
      WHERE
         version_id = $1
   `;

   return fetch(QUERY, version_id)
}
const updateQuranUpdated = (
   version_id,
   quran_version,
   verse_id
) => {
   const QUERY = `
      UPDATE
         quran_updates
      SET
         quran_version = $2,
         verse_id = $3
      WHERE
         version_id = $1
      RETURNING *;
   `;

   return fetch(
      QUERY,
      version_id,
      quran_version,
      verse_id
   )
}
const deleteQuranUpdated = (version_id) => {
   const QUERY = `
      DELETE FROM
         quran_updates
      WHERE
         version_id = $1
      RETURNING *;
   `;

   return fetch(QUERY, version_id)
}
const versionsByLimit = (limit, page) => {
   const QUERY = `
      SELECT
         *
      FROM
         versions
      ORDER BY
         version_id DESC
      LIMIT ${limit}
      OFFSET ${Number((page - 1) * limit)}
   `;

   return fetchALL(QUERY)
}
const versionsUpdates = () => {
   const QUERY = `
      SELECT
         *
      FROM
         versions
      ORDER BY
         version_id DESC;
   `;

   return fetchALL(QUERY)
}
const addVersion = (
   zikr_version,
   names_99_version,
   audios_version
) => {
   const QUERY = `
      INSERT INTO
         versions (
            zikr_version,
            names_99_version,
            audios_version
         ) VALUES (
            $1,
            $2,
            $3
         ) RETURNING *;
   `;

   return fetch(
      QUERY,
      zikr_version,
      names_99_version,
      audios_version
   )
}
const updateVersion = (
   version_id,
   zikr_version,
   names_99_version,
   audios_version
) => {
   const QUERY = `
      UPDATE
         versions
      SET
         zikr_version = $2,
         names_99_version = $3,
         audios_version = $4
      WHERE
         version_id = $1
      RETURNING *;
   `;

   return fetch(
      QUERY,
      version_id,
      zikr_version,
      names_99_version,
      audios_version
   )
}
const deleteVersion = (version_id) => {
   const QUERY = `
      DELETE FROM
         versions
      WHERE
         version_id = $1
      RETURNING *;
   `

   return fetch(QUERY, version_id)
}

module.exports = {
   quranUpdatesByLimit,
   quranUpdates,
   getUpdates,
   getUpdatedVerse,
   addUpdated,
   foundQuranUpdateds,
   updateQuranUpdated,
   deleteQuranUpdated,
   versionsByLimit,
   versionsUpdates,
   addVersion,
   updateVersion,
   deleteVersion
}