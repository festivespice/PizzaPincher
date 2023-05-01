import express from 'express';

const bodyParser = require('body-parser');
const googleController = require('../controllers/GooglePlaces');

const router = express.Router();

// get for Google Places
router.get('/yummyPlaces', bodyParser.json(), async function (req: any, res: any) {
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

export = router;
