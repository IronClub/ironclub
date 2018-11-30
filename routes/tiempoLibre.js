require('dotenv').config();

const express = require("express");
const passport = require('passport');
const ocioRoutes = express.Router();
const User = require("../models/User");
const Comment = require("../models/Comment");
const ensureLogin = require("connect-ensure-login");
const uploadCloud = require('../config/cloudinary.js');
const OcioPost = require('../models/OcioPost')

ocioRoutes.get("/", ensureLogin.ensureLoggedIn(), (req, res, next) => {
    res.render("tiempoLibre/ocio-dashboard", {user: req.user});
})

ocioRoutes.get("/videogames", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  res.render("tiempoLibre/games", {user: req.user});
})

ocioRoutes.get("/forum", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  res.render("tiempoLibre/forum", {user: req.user});
})









module.exports = ocioRoutes;



