const mongoose = require('mongoose');
const Plane = require('./Model');

// the only controller being used here is Controller.find for the time being

const Controller = {
  async createData(req, res, next) {
    try {
      const { registration, name, date, departure, arrival } = req.body;
      console.log(req.body);
      const plane = await Plane.create({
        registration,
        name,
        date,
        departure,
        arrival,
      });
      res.locals.newPlane = plane;
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

Controller.find = (req, res, next) => {
  const filter = req.params.id;
  Plane.find(
    // this is what lets you plug in either the name or registration in mongoose 
    { $or: [{ name: filter }, { registration: filter }] },
    (err, results) => {
      // Plane.find({ name: filter }), (err,results) =>{
      if (err)
        return next(
          (err) => 'Error in Controller.find: ' + JSON.stringify(err)
        );
      if (!results) res.locals.list = 'No matching name or plane found.';
      res.locals.list = results;
      return next();
    }
  );
};

module.exports = Controller;
