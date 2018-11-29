require('dotenv').config();

const express = require("express");
const meetupsAPIRouter = express.Router();
const Event = require("../models/Event");
const ensureLogin = require("connect-ensure-login");
//TODO: añadir ensureLogin


meetupsAPIRouter.get("/", (req, res, next) => {
  Event.find().then(events => {
    res.json(events);
  })
    .catch(err => console.log(err));
});

meetupsAPIRouter.get("/search", (req, res, next) => {
  let sortBy = req.query.sort;
  delete req.query.sort;
  if (req.query.name !== undefined) {
    req.query.name = new RegExp(req.query.name, "gi");
  }
  Event.find(req.query).then(events => {
    events = Array.from(events).sort((a, b) => {
      return a[sortBy].localeCompare(b[sortBy]);
    })
    res.json(events)
  })
    .catch(err => console.log(err));
});

meetupsAPIRouter.post("/", (req, res, next) => {
  let { name, description, latitude, longitude } = req.body;
  Event.add(name, description, latitude, longitude)
    .then((data) => {
      res.json('data')
    })
    .catch(err => console.log(err));
});




module.exports = meetupsAPIRouter;