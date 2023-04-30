import dotenv from 'dotenv';
import {AxiosError, AxiosResponse} from "axios";

dotenv.config(); //loads environment variables hidden from common view.

const api = process.env.API_KEY;

const axios = require('axios');

export async function getNearbyPlaces(pizzaInfoAddress : JSON) {

  // fix type error, pizzaInfoAddress[anything] gives error
  let pizzaInfoAddressJSON = JSON.parse(JSON.stringify(pizzaInfoAddress));

  // pizza will either only have a single value or have cheese, sauce, size, and toppings nested in it
  if (!pizzaInfoAddressJSON["pizza"].hasOwnProperty("cheese")) {
    var pizza = pizzaInfoAddressJSON["pizza"];

  } else {
    var cheese = pizzaInfoAddressJSON["pizza"]["cheese"];
    var sauce = pizzaInfoAddressJSON["pizza"]["sauce"];
    var size = pizzaInfoAddressJSON["pizza"]["size"];
    var toppings = pizzaInfoAddressJSON["pizza"]["toppings"];
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

  let radius = "24140"; // radius to search in meters. About 15 miles

  let fullUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + "%2C" + lng +
      "&radius=" + radius + "&type=pizza&keyword=pizza&key=" + api

  let config = {
    method: 'get',
    url: fullUrl,
    headers: {}
  };

  return axios(config)
  .then(function (response: AxiosResponse<any>) {
    return processNearbyPlaces(response.data, lat, lng);
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
    return response.data;
  })
  .catch(function (error : AxiosError<any>) {
    console.log(error);
    return "Error occurred acquiring latitude and longitude"
  });

}

function getPlaceDetails(placeID : string) {

  let fullUrl = "https://maps.googleapis.com/maps/api/place/details/json" +
      // name, rating, ratings amount, opening hours, address, phone number, website
      "?fields=" + "name" + "%2C" + "rating" + "%2C" + "user_ratings_total" + "%2C" + "opening_hours/weekday_text" +
                    "%2C" + "formatted_address" + "%2C" + "formatted_phone_number" + "%2C" + "website" +
      "&place_id=" + placeID +
      "&key=" + api

  let config = {
    method: 'get',
    url: fullUrl,
    headers: { }
  };

  return axios(config)
  .then(function (response : AxiosResponse<any>) {
    return response.data;
  })
  .catch(function (error : AxiosError<any>) {
    console.log(error);
    return "Error occurred getting place details"
  });
}

function getDistance(placeID: string[], lat: string, lng: string) {

  let fullUrl = "https://maps.googleapis.com/maps/api/distancematrix/json" +
      "?units=imperial&origins=" + lat + "%2C" + lng + "&destinations="; // distance in miles, lat lng of received address

  for (let place in placeID) {
      fullUrl += "place_id:" + placeID[place] + "|"; // places must be separated by |
  }
  fullUrl = fullUrl.slice(0, -1) // remove extra |
  fullUrl += "&key=" + api

  let config = {
    method: 'get',
    url: fullUrl,
    headers: { }
  };

  return axios(config)
  .then(function (response : AxiosResponse<any>) {
    return response.data;
  })
  .catch(function (error : AxiosError<any>) {
    console.log(error);
    return "Error occurred getting distances"
  });
}

async function processNearbyPlaces(places: any, lat : string, lng : string) {

  let placeDetails : any [] = [];
  let placeDetailsFull : any []= [];
  let placeDistance : any;


  // Extract place id for all nearby places
  let placeID : string[] = [];
  for (let i = 0; i < places.results.length; i++) {
    placeID[i] = places.results[i].place_id;
  }

  for(let i = 0; i < placeID.length; i++) {
    placeDetails[i] =  await getPlaceDetails(placeID[i]);
  }

  placeDistance = await getDistance(placeID, lat, lng)

  for(let i = 0; i < placeID.length; i++) {
    let name = undefinedCheck((_ : any) =>placeDetails[i].result.name);
    let rating =  undefinedCheck((_ : any) =>placeDetails[i].result.rating);
    let ratingNumber = undefinedCheck((_ : any) =>placeDetails[i].result.user_ratings_total);
    let openHours = undefinedCheck((_ : any) => placeDetails[i].result.opening_hours.weekday_text);
    let address = undefinedCheck((_ : any) =>placeDetails[i].result.formatted_address);
    let number = undefinedCheck((_ : any) =>placeDetails[i].result.formatted_phone_number);
    let website = undefinedCheck((_ : any) =>placeDetails[i].result.website);
    let distance = undefinedCheck((_ : any) =>placeDistance.rows[0].elements[i].distance.text);


    placeDetailsFull[i] = {
        "name": name,
        "rating":rating,
        "ratingNumber": ratingNumber,
        "openHours": openHours,
        "address": address,
        "number": number,
        "website": website,
        "distance": distance
        };
  }

  return placeDetailsFull;
}
// check if value exists, if not replace with ""
function undefinedCheck(variable : any) {
  try {
    const value = variable();
    return value !== void 0 ? value : "";
  } catch (ex) {
    return "";
  }
}
