require('dotenv').config();

const express = require("express");
const meetupsRouter = express.Router();
const Event = require("../models/Event");
const ensureLogin = require("connect-ensure-login");


meetupsRouter.get("/", ensureLogin.ensureLoggedIn(),(req, res, next) => {
  Event.find().then(events => {
    res.render('meetups/index',{"message": req.flash("error"),meetups:JSON.stringify(events),events,user:req.user});
  })
});



module.exports = meetupsRouter;