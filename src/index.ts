// setting up express server
import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import router from "./router";

// initiating app
const app = express();

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

// creating server
const server = http.createServer(app);

// run the server 
// at this point the server has been initialized
server.listen(8080,()=> {
    console.log("Server running on http://localhost:8080");
});

const MONGO_URL = "mongodb+srv://olsikule:Ednm5y8OiZ0Ccimh@cluster0.bivfcfm.mongodb.net/?retryWrites=true&w=majority"

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
// error catching
mongoose.connection.on("error", (error:Error)=>console.log(error));

app.use("/", router);