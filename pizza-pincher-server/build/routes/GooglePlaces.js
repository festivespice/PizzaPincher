"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const bodyParser = require('body-parser');
const googleController = require('../controllers/GooglePlaces');
const router = express_1.default.Router();
// get for Google Places
router.get('/yummyPlaces', bodyParser.json(), async function (req, res) {
    // check for empty body
    if (JSON.stringify(req.body) == '{}') {
        res.status(400);
        res.send('Empty body');
        return;
    }
    // send nearby places response from google using req body json
    res.status(200);
    res.send(await googleController.getNearbyPlaces(req.body));
});
module.exports = router;
