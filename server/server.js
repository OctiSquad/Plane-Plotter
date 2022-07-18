const express = require('express');
const app = express();
const path = require('path');

const PORT = 3000;
const Router = express.Router();
const Controller = require('./controllers');

// parse request body
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use('/', express.static(path.resolve(__dirname, '../client')));

app.use('/api', Router);

Router.get('/planes/:id', Controller.find, (req, res) => {
  res.status(200).send(res.locals.list)
})

// catch-all route handler
app.use((req, res) => res.status(404).send('just plane could not find it :( (404)'))

// based express error handler <3
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

// listen on port 3000
app.listen(PORT);

module.exports = app;