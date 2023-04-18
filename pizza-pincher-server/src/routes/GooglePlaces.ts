const express = require('express');
const router = express.Router();

const googleController = require('../controllers/GooglePlaces')

// get for Google Places
router.get("/yummyPlaces", async function (req : any, res : any) {
  // send string of nearby pizza places
  res.send(await googleController.getNearbyPlaces());
})

module.exports = router;