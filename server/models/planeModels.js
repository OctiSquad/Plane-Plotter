//----------Initial Setup----------
const mongoose = require('mongoose');

const MONGO_URI =
  'mongodb+srv://admin:planes@photogenicus.fkfi0.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'photogenicusDB',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

//----------Create Plane Schema----------
const planeSchema = new Schema({
  registration: {
    type: String,
    required: true,
  },
  person: {
    type: String,
    required: true,
  },
  flightId: String,
  date: Date,
  departureAirport: {
    type: String,
    required: true,
  },
  arrivalAirport: {
    type: String,
    required: true,
  },
});

const Plane = mongoose.model('plane', planeSchema);

//----------Export----------
module.exports = Plane;
