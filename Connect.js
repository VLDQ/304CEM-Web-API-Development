const mongoose = require('mongoose'); //include Mongoose module

const db = 'mongodb+srv://Vincent:test@cluster0.y3s7nlp.mongodb.net/August2022?retryWrites=true&w=majority'; //MongoDB connection string

/* connect to database */
mongoose
  .connect(
    db,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log('Connected to database!'); //success message
  })
  .catch(error => {
    console.log('Error connecting to database: ', error); //error message
  });

/* define a schema to match the table in database */
const heroSchema = new mongoose.Schema({
  countryName: {type: String},
  countryCapital: {type: String},
  countryRegion: {type: String},
  countryPopulation: {type: String},
  countryFlag: {type: String},
  countryCurrency: {type: String},
  uniName: {type: String},
  uniWebpage: {type: String},
  uniDomain: {type: String}
});

const Record = mongoose.model('searchrecords', heroSchema); //'searchrecords' is the collection name

module.exports = Record;
