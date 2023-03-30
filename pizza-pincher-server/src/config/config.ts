//get everything organized from our .env variables
import dotenv from 'dotenv';

dotenv.config(); //loads environment variables hidden from common view. 

const MONGO_URL = '';

const MONGO_PORT = process.env.MONGOPORT ? Number(process.env.MONGOPORT) : 3366;  //if there is a server port, use it. If not, use default.

export const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: MONGO_PORT
    }
};


