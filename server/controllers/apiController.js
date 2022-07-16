//----------Initial Setup - Require Model----------
const Plane = require('../models/planeModels');

const apiController = {
  async createData(req, res, next) {
    try {
      const {
        registration,
        person,
        flightId,
        departureAirport,
        arrivalAirport,
      } = req.body;
      console.log(req.body);
      const plane = await Plane.create({
        registration,
        person,
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
      const planeinDB = await Plane.find({ person: req.params.name });
      if (!planeinDB[0]) throw new Error();
      res.locals.planeinDB = planeinDB;
      return next();
    } catch (err) {
      return next(err);
    }
  },

  async updatePlane(req, res, next) {
    try {
      const { person } = req.params;
      const newPerson = req.body.person;
      const planeinDB = await Plane.findOneAndUpdate(
        { person: person },
        { person: newPerson },
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
      const { person } = req.params;
      const planeinDB = await Plane.findOneAndDelete({ person: person });
      res.locals.deletedPerson = planeinDB;
      return next();
    } catch (err) {
      return next(err);
    }
  },
};

//----------Export----------
module.exports = apiController;
