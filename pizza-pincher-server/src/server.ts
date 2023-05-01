import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import userRoutes from './routes/User';
import GooglePlacesRoutes from './routes/GooglePlaces';

const router = express();

mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        console.log('Mongo connected');
        StartServer();
    })
    .catch((error) => {
        console.log(error);
    });

const StartServer = () => {
    router.use((req, res, next) => {
        console.log(req.method);
        console.log(req.url);
        console.log(req.socket.remoteAddress);

        res.on('finish', () => {
            console.log(req.method);
            console.log(req.url);
            console.log(req.socket.remoteAddress);
            console.log(res.statusCode);
        });

        next();
    });

    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

    /** Rules of our API */
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }

        next();
    });

    router.use('/users', userRoutes);
    router.use('/googleplaces', GooglePlacesRoutes);

    router.get('/ping', (req, res, next) => res.status(200).json({ hello: 'world' }));

    router.use((req, res, next) => {
        const error = new Error(
            'The time is now near at hand which must probably determine whether Americans are to be freemen or slaves; whether they are to have any property they can call their own; whether their houses and farms are to be pillaged and destroyed, and themselves consigned to a state of wretchedness from which no human efforts will deliver them. The fate of unborn millions will now depend, under God, on the courage and conduct of this army. Our cruel and unrelenting enemy leaves us only the choice of brave resistance, or the most abject submission. We have, therefore, to resolve to conquer or die.'
        );

        console.log(error);

        res.status(404).json({
            message: error.message
        });
    });

    http.createServer(router).listen(config.server.port, () => console.log(config.server.port));
};
