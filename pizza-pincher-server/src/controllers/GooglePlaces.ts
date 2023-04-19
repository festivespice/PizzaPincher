import dotenv from 'dotenv';
import {AxiosError, AxiosResponse} from "axios";

dotenv.config(); //loads environment variables hidden from common view.

const api = process.env.API_KEY;

const axios = require('axios');

export async function getNearbyPlaces(pizzaInfoAddress : JSON) {
  console.log(pizzaInfoAddress);

  // fix type error, pizzaInfoAddress[anything] gives error
  let pizzaInfoAddressJSON = JSON.parse(JSON.stringify(pizzaInfoAddress));

  // pizza will either only have a single value or have cheese, sauce, size, and toppings nested in it
  if (!pizzaInfoAddressJSON["pizza"].hasOwnProperty("cheese")) {
    var pizza = pizzaInfoAddressJSON["pizza"];
    console.log(pizza);
  } else {
    var cheese = pizzaInfoAddressJSON["pizza"]["cheese"];
    var sauce = pizzaInfoAddressJSON["pizza"]["sauce"];
    var size = pizzaInfoAddressJSON["pizza"]["size"];
    var toppings = pizzaInfoAddressJSON["pizza"]["toppings"];
    console.log(cheese, sauce, size, toppings);
  }
  // will send this information somewhere later
  if (typeof pizza !== "undefined") {
    // TODO send pizza info
  } else {
    // TODO send cheese sauce size toppings
  }

  // get the latitude and longitude
  let latLng  = await getLatLng(pizzaInfoAddressJSON["place"].replaceAll(" ", "+"));
  let lat = latLng["results"][0]["geometry"]["location"]["lat"];
  let lng = latLng["results"][0]["geometry"]["location"]["lng"];

  let radius = "8000"; // radius to search in meters, 8000 meters is about 5 miles

  let fullUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + "%2C" + lng +
      "&radius=" + radius + "&type=restaurant&keyword=pizza&key=" + api

  let config = {
    method: 'get',
    url: fullUrl,
    headers: {}
  };

  return axios(config)
  .then(function (response: AxiosResponse<any>) {
    return response.data; // temporarily returned as string until target information identified
  })
  .catch(function (error: AxiosError<any>) {
    console.log(error);
    return "Error occurred finding nearby places"
  });
}

function getLatLng(address : string) {

  // address example format 1600+Amphitheatre+Parkway,+Mountain+View,+CA
  let fullUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=" + api


  let config = {
    method: 'get',
    url: fullUrl,
    headers: { }
  };

  return axios(config)
  .then(function (response : AxiosResponse<any>) {
    return response.data
  })
  .catch(function (error : AxiosError<any>) {
    console.log(error);
    return "Error occurred acquiring latitude and longitude"
  });

}
