require('dotenv').config();

const express = require("express");
const meetupsAPIRouter = express.Router();
const Event = require("../../models/Event");
const ensureLogin = require("connect-ensure-login");
//TODO: añadir ensureLogin


meetupsAPIRouter.get("/", (req, res, next) => {
  Event.find().then(events => {
    console.log(JSON.stringify(events));
  })
  .catch (err=>console.log(err));
});

meetupsAPIRouter.get("/search", (req, res, next) => {
  if (req.query.name!==undefined){
    req.query.name=new RegExp(req.query.name, "gi");
  }
  Event.find(req.query).then(events => {
    // return (JSON.stringify(events));
    res.json(events)
  })
  .catch (err=>console.log(err));
});



module.exports = meetupsAPIRouter;