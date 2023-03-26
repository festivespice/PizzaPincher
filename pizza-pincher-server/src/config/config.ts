//get everything organized from our .env variables
import dotenv from 'dotenv';

dotenv.config(); //loads environment variables hidden from common view. 

const MONGO_URL = '';

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 3366;  //if there is a server port, use it. If not, use default.

export const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    }
};


