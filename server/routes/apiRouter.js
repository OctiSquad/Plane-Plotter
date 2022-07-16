//----------Initial Setup----------
const express = require('express');
const router = express.Router();

// require in controller when we have a MW function
const apiController = require('../controllers/apiController');

//----------Routers to Controllers----------
router.get('/:person', apiController.getPlane, (req, res) => {
  return res.status(200).json(res.locals.planeinDB);
});

router.post('/', apiController.createData, (req, res) => {
  return res.status(200).json(res.locals.newPlane);
});

router.patch('/update/:person', apiController.updatePlane, (req, res) => {
  return res.status(200).json(res.locals.updatedPlane);
});

router.delete('/payus/:person', apiController.deletePlane, (req, res) => {
  return res.status(200).send(`Deleted: ${res.locals.deletedPerson}`);
});

//----------Export----------
module.exports = router;
