const mongoose = require('mongoose');
const Plane = require('./Model');

const Controller = {
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

  // async getPlane(req, res, next) {
  //   try {
  //     const planeinDB = await Plane.find({ name: req.params.name });
  //     if (!planeinDB) throw new Error();
  //     res.locals.planeinDB = planeinDB;
  //     return next();
  //   } catch (err) {
  //     return next(err);
  //   }
  // },

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

// userController.createPlane = (req, res, next) => {
//   const { name, registration } = req.query; // id ????

//   Plane.create({

//   })
//     .then(inputDoc => {
//       res.locals.plane= inputDoc;
//       return next();
//     })
//     .catch(err => {
//       return next({
//         log: `userController.createUser: ERROR: ${ err }`,
//         message: { err: 'Error occurred in controllers.createPlane - Check server logs for more details'}
//       });
//     });
// };

// userController.getAllUsers = (req, res, next) => {
//   User.find({}, (err, users) => {
//     if (err) return next('Error in userController.getAllUsers: ' + JSON.stringify(err));
//     res.locals.users = users;
//     return next();
//   });
// };

Controller.find = (req, res, next) => {
  const filter = req.params.id;
  Plane.find(
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

Controller.findPlane = (req, res, next) => {
  const registration = req.params.id; // id?
  Plane.find({}, (err, result) => {
    if (err)
      return next('Error in userController.findPlane: ' + JSON.stringify(err));
    if (!result) {
      console.log('No plane found');
      return next();
    } else {
      console.log('Plane found!');
      // CHANGE TO INCLUDE USER SAVE DATA
      // console.log(result);
      res.locals.plane = result;
      return next();
    }
  });
};

// userController.updateUser = (req, res, next) => {

// };

// userController.deleteUser = (req, res, next) => {

// };

module.exports = Controller;
