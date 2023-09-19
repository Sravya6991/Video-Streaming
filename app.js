const express = require("express");
const path = require("path");
const ejs = require("ejs");
const mongoose = require("mongoose");

const route = require("./Routes/movieRoutes");
const app = express();

// middlewares
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"));

app.use(express.json());

app.use(route);


// upload json data and file to mongodb


mongoose.connect("mongodb://127.0.0.1:27017/movies-api")
    .then(function(client){
        app.listen("5000", () => console.log("Server is running"));
    });
    

        

