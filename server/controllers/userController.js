const db = require('../userModel.js');

const userController = {};

userController.signup = (req, res, next) => {
  const queryString = `
  INSERT INTO accountinfo(username, password)
  VALUES('${req.body.username}','${req.body.password}') RETURNING *
`;
  db.query(queryString, (err, result) => {
    if (err) {
      console.log(err, 'Caught add character error');
      return next(err);
    }
    // console.log('Finished Creating Account');
    return next();
  });
};

userController.verifyUser = (req, res, next) => {
  const queryString = `SELECT * FROM "public"."accountinfo" `;
  //   console.log(req.body.username);
  db.query(queryString)
    .then((data) => {
      let accountInfos = {};
      data.rows.forEach((obj) => {
        accountInfos[obj.username] = obj.password;
      });
      if (accountInfos[req.body.username] === req.body.password) {
        next();
      } else {
        return next({
          log: 'Login credentials were invalid.',
          message: `Login credentials are not valid. Try again.`,
        });
      }
    })
    .catch((err) => {
      return next({
        log: 'userController.verifyUser error',
        message: `Error occurred from query: ${err}`,
      });
    });
};

module.exports = userController;
