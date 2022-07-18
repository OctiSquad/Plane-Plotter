const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MONGO_URI = 'mongodb+srv://user:123@cluster0.zelt5.mongodb.net/?retryWrites=true&w=majority';

// connect to my db
mongoose.connect(MONGO_URI, 
  {
    // solves deprecated url parser issue: https://mongoosejs.com/docs/5.x/docs/deprecations.html#the-usenewurlparser-option
    useNewUrlParser: true, 
    // timeout if the server can't connect within 30sec: https://mongoosejs.com/docs/5.x/docs/deprecations.html#useunifiedtopology 
    useUnifiedTopology: true,
    // name the db that our collections are part of
    dbName: 'planes'
})

.then(() => console.log('Connected to Mongo DB.'))
.catch(err => console.log(err));

const planeSchema = new Schema({
  registration: { type: String, required: true, unique: true },
  name: { type: String },
  date: { type: String },
  departure: { type: String },
  arrival: { type: String }
});

const Plane = mongoose.model('plane', planeSchema);
module.exports = Plane;