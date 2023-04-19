/* Import basic modules */
import dotenv from 'dotenv';
dotenv.config();

//dotenv is handled both here and at ./config. Those values need to be imported here.

//TODO: Implement Google Maps API
//TODO: implement Domino's API 
//TODO: Implement database and API
//TODO: Implement user collection for database
//TODO: Implement user authentication

//using Typescript lets us import packages instead of requiring them. 
import express from 'express';
import http from 'http'; 
import cors from 'cors'; //if a package can't be imported normally in typescript, try installing the typescript types

/* Create and modify server object */
//create an express object that "uses" the libraries we specify for things like cookies or CORS. 
const app = express()
const serverPort = process.env.SERVERPORT; 
const frontEndPort = process.env.FRONTENDPORT; 
app.use(cors({
    origin:['http://localhost:' + frontEndPort, 'http://127.0.0.1:' + frontEndPort], //what sources would we allow
    credentials: true //for cookies, if we use them
}))

/* MongoDB */
//Connect to the database on Atlas here by exporting the connection variables from the config file

/* Initializing sessions */
//Allow the express object to use cookies and create keys for the cookies, also let it use Passport to manage them.

/* Routes */
//Allow the express object to use the definied endpoints for our REST API 
// This is where the routes in the ./routes folder will go. 
// import PizzaRoute from ''
// import UserRoute from  ''
// import DominosRoute from ''
// import GooglePlacesRoute from ''
const googleRouter = require("./routes/GooglePlaces.ts")
app.use("/api", googleRouter);

app.get('/', function(req,res){
    res.send("<h2> An API used to access 'user', 'googleplaces', 'dominos', and 'user' endpoints</h2>")
})

/* Start server object: all routes and packages should be implemented before this line. */
app.listen(serverPort, function(){
    console.log("Server started at port " + serverPort)
})

//To run this .ts file, do 'npx ts-node ./pizza-pincher-server/src/server.ts'