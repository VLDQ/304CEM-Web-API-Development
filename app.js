const Record = require('./Connect'); //include Connect.js, to connect to MongoDB database
const express = require('express'); //include Express module, to start a server and listen on port 5000
const app = express(); //an object returned by express()
const axios = require('axios'); //include Axios module, to send HTTP requests and receive responses

/* variables to store the api data */
var countryName, countryCapital, countryRegion, countryPopulation, countryFlag, countryCurrency;
var uniName, uniWebpage, uniDomain;


/* localhost:5000/getCountry?country=countryName */
app.get('/getCountry', (req, res) => {
  const country = req.query.country; //store country name input
  console.log(country); //for checking purpose only

  const querystr = `https://restcountries.com/v2/name/${country}`; //1st api link

  /* call the 1st api: send request, then receive response (the api data) */
  axios.get(querystr).then( (response) => {
    /* variables to store the api data received */
    countryName = response.data[0].name;
    countryCapital = response.data[0].capital;
    countryRegion = response.data[0].region;
    countryPopulation = response.data[0].population;
    countryFlag = response.data[0].flags.png;
    countryCurrency = response.data[0].currencies[0].name;

    /* for checking purpose only */
    console.log(countryName);
    console.log(countryCapital);
    console.log(countryRegion);
    console.log(countryPopulation);
    console.log(countryFlag);
    console.log(countryCurrency);


    const querystr = `http://universities.hipolabs.com/search?country=${country}`; //2nd api link

    /* call the 2nd api: send request, then receive response (the api data) */
    axios.get(querystr).then( (response) => {
      /* variables to store the api data received */
      uniName = response.data[0].name;
      uniWebpage = response.data[0].web_pages[0];
      uniDomain = response.data[0].domains[0];

      /* for checking purpose only */
      console.log(uniName);
      console.log(uniWebpage);
      console.log(uniDomain);


      /* declare new record to be saved to database */
      const recordValue = new Record({
        countryName:countryName,
        countryCapital:countryCapital,
        countryRegion:countryRegion,
        countryPopulation:countryPopulation,
        countryFlag:countryFlag,
        countryCurrency:countryCurrency,
        uniName:uniName,
        uniWebpage:uniWebpage,
        uniDomain:uniDomain
      });
      
      /* validation for country not found */
      if (!recordValue.countryName) {
        res.status(200).json('Not found');
        return;
      }

      /* save to database */
      recordValue.save()
        .then(result => {
          console.log("Success" + result); //success message
          res.status(200).json(result);
        })
        .catch(error => {
          console.log("Error" + error); //error message
          res.status(400).json(error);
        });
    });
  })
  .catch(error => {
    res.status(400).json(error);
  });
});


/* localhost:5000/getAllCountries */
app.get('/getAllCountries', (req, res) => {
  /* return all records from database */
  Record.find({})
    .then(result => {
      res.status(200).json(result);
    })
    .catch(error => {
      res.status(400).json(error);
    });
});


/* localhost:5000/deleteCountry?country=countryName */
app.get('/deleteCountry', (req, res) => {
  const country = req.query.country; //store country name input
  console.log(country); //for checking purpose only
  
  /* delete the record(s) that satisfy a country name */
  Record.deleteMany({ countryName: country })
    .then(result => {
      console.log('Successfully deleted'); //success message
      res.status(200).json(result);
    })
    .catch(error => {
      res.status(400).json(error);
    });
});


/* server listening on port 5000 */
app.listen(5000, () => {
  console.log('Server listening on port 5000');
});
