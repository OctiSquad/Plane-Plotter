const { Pool } = require('pg');

const PG_URL =
  'postgres://vmndgdep:XtctEXTmvqjmUJDreznsw8al96fthLl-@jelani.db.elephantsql.com/vmndgdep';

const pool = new Pool({
  connectionString: PG_URL,
});

const queryString = `
CREATE TABLE accountinfo (
  Username varchar(255),
  Password varchar(255)
);
`;

pool.query(queryString, (err, result) => {
  console.log('Finished Creating Account');
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
