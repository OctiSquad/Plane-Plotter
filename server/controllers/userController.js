const db = require('../userModel.js');

const userController = {};

userController.signUp = (req, res, next) => {
  const queryString = `
  INSERT INTO accountinfo(username, password)
  VALUES('${req.body.username}',' ${req.body.password}') RETURNING *
`;
  db.query(queryString, (err, result) => {
    if (err) {
      console.log(err, 'Caught add character error');
      return next(err);
    }
    console.log('Finished Creating Account');
    return next();
  });
};

module.exports = userController;
