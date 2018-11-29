require('dotenv').config();

const express = require("express");
const passport = require('passport');
const meetupsRouter = express.Router();
const Event = require("../models/Event");
const ensureLogin = require("connect-ensure-login");
//TODO: añadir ensureLogin


meetupsRouter.get("/", (req, res, next) => {
  Event.find().then(events => {
    res.render('meetups/index',{"message": req.flash("error"),meetups:JSON.stringify(events),events});
  })
});

module.exports = meetupsRouter;