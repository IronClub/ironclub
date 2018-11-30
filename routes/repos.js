require('dotenv').config();

const express = require("express");
const passport = require('passport');
const reposRoutes = express.Router();
const ensureLogin = require("connect-ensure-login");
const uploadCloud = require('../config/cloudinary.js');

reposRoutes.get("/", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  res.render("repos/reposSec", {user: req.user});
})

module.exports = reposRoutes;