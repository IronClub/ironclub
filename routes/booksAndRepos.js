require('dotenv').config();

const express = require("express");
const passport = require('passport');
const booksAndReposRoutes = express.Router();
const User = require("../models/User");
const Comment = require("../models/Comment");
const ensureLogin = require("connect-ensure-login");
const uploadCloud = require('../config/cloudinary.js');
const OcioPost = require('../models/OcioPost');

booksAndReposRoutes.get("/", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  res.render("books/booksSec");
})

// booksAndReposRoutes.get("/", ensureLogin.ensureLoggedIn(), (req, res, next) => {
//   res.render("tiempoLibre/ocio-dashboard");
// });













module.exports = booksAndReposRoutes;