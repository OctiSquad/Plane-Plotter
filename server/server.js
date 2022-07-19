//----------Initial Setup----------
const path = require('path');
const express = require('express');
const app = express();

const PORT = 3000;
const Controller = require('./controllers');

const apiRouter = require('./routes/apiRouter');

// parse request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//----------Router----------
app.use('/api', apiRouter);

apiRouter.get('/planes/:id', Controller.find, (req, res) => {
  res.status(200).send(res.locals.list);
});

// catch-all route handler
app.use((req, res) =>
  res.status(404).send('just plane could not find it :( (404)')
);
// based express error handler <3

//----------Global Error Handler----------
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: err.message,
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

//----------Start Server----------
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

//----------Export----------
module.exports = app;
