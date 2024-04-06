const { fetchALL, fetch } = require('../../lib/postgres')

const voteList = (limit, page, lang) => {
   const QUERY = `
      SELECT
         *
      FROM
         additional_votes
      ${lang ? `
         WHERE
            vote_lang = '${lang}'
      ` : ""}
      ORDER BY
         vote_id DESC
      LIMIT ${limit}
      OFFSET ${Number((page - 1) * limit)};
   `;

   return fetchALL(QUERY)
}
const addVote = (
   vote_name,
   vote_lang,
   audioUrl,
   audioName
) => {
   const QUERY = `
      INSERT INTO
         additional_votes (
            vote_name,
            vote_lang,
            vote_audio_url,
            vote_audio_name
         ) VALUES (
            $1,
            $2,
            $3,
            $4
         ) RETURNING *;
   `;

   return fetch(
      QUERY,
      vote_name,
      vote_lang,
      audioUrl,
      audioName
   )
}
const foundVote = (vote_id) => {
   const QUERY = `
      SELECT
         *
      FROM
         additional_votes
      WHERE
         vote_id = $1;
   `;

   return fetch(QUERY, vote_id)
}
const updateVote = (
   vote_id,
   vote_name,
   vote_lang,
   audioUrl,
   audioName
) => {
   const QUERY = `
      UPDATE
         additional_votes
      SET
         vote_name = $2,
         vote_lang = $3,
         vote_audio_url = $4,
         vote_audio_name = $5
      WHERE
         vote_id = $1
      RETURNING *;
   `;

   return fetch(
      QUERY,
      vote_id,
      vote_name,
      vote_lang,
      audioUrl,
      audioName
   )
}
const deleteVote = (vote_id) => {
   const QUERY = `
      DELETE FROM
         additional_votes
      WHERE
         vote_id = $1
      RETURNING *;
   `;

   return fetch(QUERY, vote_id)
}

module.exports = {
   voteList,
   addVote,
   foundVote,
   updateVote,
   deleteVote
}