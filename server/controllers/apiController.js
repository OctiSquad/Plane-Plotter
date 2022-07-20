const apiController = {};
const db = require('../userModel.js');

const axios = require('axios');

apiController.find = (req, res, next) => {
  //   console.log(req.body.username);
  const queryString = `SELECT inputs.flightID, flights.* 
  FROM users
  LEFT JOIN inputs ON users.username = inputs.username 
  LEFT JOIN flights on flights.searchID = inputs.flightID
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

module.exports = apiController;
