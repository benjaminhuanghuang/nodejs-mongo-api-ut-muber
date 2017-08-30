const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
const app = express();

mongoose.Promise = global.Promise;

// Use testing database for testing
if (process.env.NODE_ENV !== "test")
  mongoose.connect("mongodb://localhost/muber", { useMongoClient: true });

// middleware
app.use(bodyParser.json());

routes(app);

module.exports = app;
