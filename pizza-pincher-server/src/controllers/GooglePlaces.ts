//npx ts-node .\src\controllers\GooglePlaces.ts to run this

import dotenv from 'dotenv';

dotenv.config(); //loads environment variables hidden from common view.

var api = process.env.API_KEY;
// need to split up this url more to for parameters
var fullUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522%2C151.1957362&radius=1500&type=restaurant&keyword=cruise&key=" + api

// Googles code for using nearby searches with Places API
// https://developers.google.com/maps/documentation/places/web-service/search-nearby#maps_http_places_nearbysearch-js
var axios = require('axios');

var config = {
  method: 'get',
  url: fullUrl,
  headers: { }
};

axios(config)
.then(function (response: any) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error: any) {
  console.log(error);
});
