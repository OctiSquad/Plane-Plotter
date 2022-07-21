const { Pool } = require('pg');

const PG_URL =
  'postgres://vmndgdep:XtctEXTmvqjmUJDreznsw8al96fthLl-@jelani.db.elephantsql.com/vmndgdep';

const pool = new Pool({
  connectionString: PG_URL,
});

module.exports = {
  query: (text, params, callback) => {
    // console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};

// CREATE TABLE public.FLIGHTS (
// 	SearchID serial NOT NULL,
// 	Registration varchar(255) NOT NULL,
// 	HEXICAO24 varchar(255) NOT NULL,
// 	Person varchar(255) NOT NULL,
// 	DepartureLoc varchar(255) NOT NULL,
// 	ArrivalLoc varchar(255) NOT NULL,
// 	Date varchar NOT NULL,
// 	CONSTRAINT FLIGHTS_pk PRIMARY KEY (SearchID)
// ) WITH (
//   OIDS=FALSE
// );

// CREATE TABLE public.USERS (
// 	Username varchar(17) NOT NULL,
// 	Password varchar(52) NOT NULL,
// 	CONSTRAINT USERS_pk PRIMARY KEY (Username)
// ) WITH (
//   OIDS=FALSE
// );

// CREATE TABLE public.INPUTS (
// 	searchID integer NOT NULL,
// 	Username varchar(17) NOT NULL,
// 	FlightID serial NOT NULL,
// 	CONSTRAINT INPUTS_pk PRIMARY KEY (searchID)
// ) WITH (
//   OIDS=FALSE
// );

// ALTER TABLE INPUTS ADD CONSTRAINT INPUTS_fk0 FOREIGN KEY (Username) REFERENCES USERS(Username);
// ALTER TABLE INPUTS ADD CONSTRAINT INPUTS_fk1 FOREIGN KEY (FlightID) REFERENCES FLIGHTS(SearchID);

////////

// INSERT INTO flights(searchID, Registration, HEXICAO24, Person, DepartureLoc, ArrivalLoc, Date)
// VALUES(1,'reg', 'hex', 'person', 'depart', 'arrive', 'date');

// INSERT INTO inputs(searchID, Username, FlightID)
// VALUES(1,'test2', 1);

////////

// const queryString = `
// CREATE TABLE accountinfo (
//   Username varchar(255) UNIQUE,
//   Password varchar(255)
// );
// `;

// pool.query(queryString, (err, result) => {});

////////
// CREATE TABLE public.FLIGHTS (
// 	SearchID serial NOT NULL,
// 	Registration varchar(255) NOT NULL,
// 	HEXICAO24 varchar(255) NOT NULL,
// 	Person varchar(255) NOT NULL,
// 	DepartureLoc varchar(255) NOT NULL,
// 	ArrivalLoc varchar(255) NOT NULL,
// 	Date varchar NOT NULL,
//         Searcher varchar(17));

// CREATE TABLE public.USERS (
// 	Username varchar(17) NOT NULL UNIQUE,
// 	Password varchar(52) NOT NULL);
