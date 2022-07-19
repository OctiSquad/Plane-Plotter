const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MONGO_URI =
  'mongodb+srv://user:123@cluster0.zelt5.mongodb.net/?retryWrites=true&w=majority';

// connect to my db
mongoose.connect(MONGO_URI, {
    // solves deprecated url parser issue: https://mongoosejs.com/docs/5.x/docs/deprecations.html#the-usenewurlparser-option
    useNewUrlParser: true,
    // timeout if the server can't connect within 30sec: https://mongoosejs.com/docs/5.x/docs/deprecations.html#useunifiedtopology
    useUnifiedTopology: true,
    // name the db that our collections are part of
    dbName: 'planes',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

  // with the way our data is written, it would make more sense for a "plane" document to be called a "trip". 
  // This way we could track every trip, but... SQL would be a far better database structure for organizing that information and making calls to get specific stuff from it

const planeSchema = new Schema({
  registration: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  date: { type: String },
  departure: { type: String },
  arrival: { type: String, required: true },
});

const Plane = mongoose.model('plane', planeSchema);
module.exports = Plane;
