const express = require("express");
const countriesRouter = require("./routes/countryRouter");
const activitiesRouter = require("./routes/activityRouter");
const morgan = require("morgan");
const cors = require("cors");

const server = express();

server.use(morgan("dev"));
server.use(express.json());
server.use(cors({
  origin: [
    'https://pi-countries-m4vpvpmgc-francocaceres1.vercel.app',
    'https://proyectofinal-henry-production.up.railway.app'
  ]
}));

server.use('/countries', countriesRouter);
server.use('/activities', activitiesRouter);

module.exports = server;
