import dotenv from 'dotenv';
import {AxiosError, AxiosResponse} from "axios";

dotenv.config(); //loads environment variables hidden from common view.

const api = process.env.API_KEY;

const axios = require('axios');

export async function getNearbyPlaces() {
  // get the latitude and longitude
  let latLng  = await getLatLng();
  let lat = latLng["results"][0]["geometry"]["location"]["lat"];
  let lng = latLng["results"][0]["geometry"]["location"]["lng"];

  let radius = "500"; // radius to search in meters

  let fullUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + "%2C" + lng +
      "&radius=" + radius + "&type=restaurant&keyword=pizza&key=" + api

  let config = {
    method: 'get',
    url: fullUrl,
    headers: {}
  };

  return axios(config)
  .then(function (response: AxiosResponse<any>) {
    return JSON.stringify(response.data); // temporarily returned as string until target information identified
  })
  .catch(function (error: AxiosError<any>) {
    console.log(error);
    return "Error occurred finding nearby places"
  });
}

function getLatLng() {

  // address example format 1600+Amphitheatre+Parkway,+Mountain+View,+CA
  let address = "Lakeland+Square+Mall,+Lakeland,+FL"
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
