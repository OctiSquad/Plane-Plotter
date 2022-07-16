//----------Initial Setup----------
const path = require('path');
const express = require('express');
const apiRouter = require('./routes/apiRouter');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//----------Router----------
app.use('/api', apiRouter);

// catch-all route handler for any requests to an unknown route
app.use((req, res) => res.status(404).send('lol 404'));

//----------Global Error Handler----------
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
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
