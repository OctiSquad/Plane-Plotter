const { Pool } = require('pg');

const PG_URL =
  'postgres://vmndgdep:XtctEXTmvqjmUJDreznsw8al96fthLl-@jelani.db.elephantsql.com/vmndgdep';

const pool = new Pool({
  connectionString: PG_URL,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
