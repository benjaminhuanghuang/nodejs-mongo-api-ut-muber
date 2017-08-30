const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const app = express();

// middleware
app.use(bodyParser.json());

routes(app);

module.exports = app;