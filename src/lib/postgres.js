const { Pool } = require("pg");
const { connection } = require("../config");

// const credentials = {
//   user: "tamalpro_database_user",
//   host: "localhost",
//   database: "tamalpro_database",
//   password: "spaceteam9959",
//   port: 5432,
// };

const pool = new Pool({
  connectionString: connection.connectionStringEL,
});

const fetch = async (SQL, ...params) => {
  const client = await pool.connect();
  try {
    const {
      rows: [row],
    } = await client.query(SQL, params.length ? params : null);
    return row;
  } finally {
    client.release();
  }
};

const fetchALL = async (SQL, ...params) => {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(SQL, params.length ? params : null);
    return rows;
  } finally {
    client.release();
  }
};

module.exports = {
  fetch,
  fetchALL,
};