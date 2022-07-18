//----------Initial Setup - Require Model----------
const Plane = require('../Model');
const APIKEY = '3bea41ccbcf41df820d44466a53faf43';
const APIURI = 'http://api.aviationstack.com/v1/';
const axios = require('axios');

// Real-Time Flights
// flights > aircraft > registration = flights[aircraft][registration]

const apiController = {
  async fetchAPI(req, res, next) {
    axios
      // .get(`${APIURI}flights?access_key=${APIKEY}`)
      .get(`${APIURI}airplanes?access_key=${APIKEY}`)

      .then((response) => {
        const apiResponse = response.data;
        // if (Array.isArray(apiResponse['data'])) {
        //   apiResponse['data'].forEach((flight) => {
        //     // if (!flight['live']['is_ground']) {
        //     console.log(
        //       `${flight['airline']['name']} flight ${flight['flight']['iata']}`,
        //       `from ${flight['departure']['airport']} (${flight['departure']['iata']})`,
        //       `to ${flight['arrival']['airport']} (${flight['arrival']['iata']}) is in the air. }`
        //     );
        //     // }
        //   });
        // }
        res.locals.fetched = apiResponse;
        return next();
      })
      .catch((error) => {
        console.log(error);
      });
  },

  async createData(req, res, next) {
    try {
      const { registration, name, flightId, departureAirport, arrivalAirport } =
        req.body;
      console.log(req.body);
      const plane = await Plane.create({
        registration,
        name,
        flightId,
        departureAirport,
        arrivalAirport,
      });
      res.locals.newPlane = plane;
      return next();
    } catch (err) {
      return next(err);
    }
  },

  async getPlane(req, res, next) {
    try {
      const planeinDB = await Plane.find({ name: req.params.name });
      if (!planeinDB) throw new Error();
      res.locals.planeinDB = planeinDB;
      return next();
    } catch (err) {
      return next(err);
    }
  },

  async updatePlane(req, res, next) {
    try {
      const { name } = req.params;
      const newName = req.body.name;
      const planeinDB = await Plane.findOneAndUpdate(
        { name: name },
        { name: newName },
        { new: true }
      );
      res.locals.updatedPlane = planeinDB;
      return next();
    } catch (err) {
      return next(err);
    }
  },

  async deletePlane(req, res, next) {
    try {
      const { name } = req.params;
      const planeinDB = await Plane.findOneAndDelete({ name: name });
      res.locals.deletedName = planeinDB;
      return next();
    } catch (err) {
      return next(err);
    }
  },
};

//----------Export----------
module.exports = apiController;
