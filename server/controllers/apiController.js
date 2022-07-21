const apiController = {};
const db = require('../userModel.js');
const fetch = require('node-fetch');

const axios = require('axios');
const { json } = require('express');
const { search } = require('../server.js');

const urlAddresses = {
  'Elon Musk': `https://samples.adsbexchange.com/traces/2022/07/01/af/trace_full_a835af.json`,
  'Mark Cuban': `https://samples.adsbexchange.com/traces/2022/07/01/db/trace_full_a99adb.json`,
  'Tiger Woods': `https://samples.adsbexchange.com/traces/2022/07/01/2e/trace_full_a67d2e.json`,
};

apiController.history = (req, res, next) => {
  //   console.log(req.body.username);
  const queryString = `SELECT flights.* 
  FROM users
  LEFT JOIN flights ON users.username = flights.searcher 
  WHERE users.username='${req.body.username}'`;

  db.query(queryString)
    .then((data) => {
      res.locals.flightHistory = data.rows;
      next();
    })
    .catch((err) => {
      return next({
        log: 'apiController.find error',
        message: 'Error occurred from query',
      });
    });
};

apiController.search = (req, res, next) => {
  fetch(urlAddresses[req.body.search])
    .then((res) => res.json())
    .then((data) => {
      // console.log(Object.keys(data));
      let registration = data.r;
      let hex = data.icao;
      let person = data.ownOp;
      let date = 'July 1, 2022';

      let startLat = data.trace[0][1];
      let startLong = data.trace[0][2];
      let endLat = data.trace[data.trace.length - 1][1];
      let endLong = data.trace[data.trace.length - 1][2];
      let searcher = req.body.username;

      const dataValues = {
        searcher,
        registration,
        hex,
        person,
        date,
        startLat,
        startLong,
        endLat,
        endLong,
      };

      return dataValues;
    })
    .then((params) => {
      const start = {
        method: 'GET',
        url: 'https://geocodeapi.p.rapidapi.com/GetTimezone',
        params: { latitude: params.startLat, longitude: params.startLong },
        headers: {
          'X-RapidAPI-Key':
            '8d78c2c137msh45549c0419a5bcfp1908b7jsn3ad72d367882',
          'X-RapidAPI-Host': 'geocodeapi.p.rapidapi.com',
        },
      };
      axios
        .request(start)
        .then(function (response) {
          params.startLocation = response.data.TimeZoneId;
          // console.log('Start Location: ', response.data.TimeZoneId);
        })
        .catch(function (error) {
          // console.error(error);
        });

      return params;
    })
    .then((params) => {
      const end = {
        method: 'GET',
        url: 'https://geocodeapi.p.rapidapi.com/GetTimezone',
        params: { latitude: params.endLat, longitude: params.endLong },
        headers: {
          'X-RapidAPI-Key':
            '8d78c2c137msh45549c0419a5bcfp1908b7jsn3ad72d367882',
          'X-RapidAPI-Host': 'geocodeapi.p.rapidapi.com',
        },
      };
      axios
        .request(end)
        .then(function (response) {
          // console.log('End Location: ', response.data.TimeZoneId);
          params.endLocation = response.data.TimeZoneId;

          const queryString = `
      INSERT INTO flights(Registration, HEXICAO24, Person, DepartureLoc, ArrivalLoc, Date, Searcher)
      VALUES('${params.registration}', '${params.hex}', '${params.person}', '${params.startLocation}', '${params.endLocation}', '${params.date}', '${params.searcher}') RETURNING *
    `;
          db.query(queryString).then((data) => {
            console.log(data.rows);
            res.locals.searchResult = data.rows;
            // console.log(res.locals.seachResult);
            next();
          });
        })
        .catch(function (error) {
          // console.error(error);
        });
    });

  // next();
};

module.exports = apiController;
