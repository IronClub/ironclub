require('dotenv').config();

const express = require("express");
const passport = require('passport');
const booksRoutes = express.Router();
const ensureLogin = require("connect-ensure-login");
const uploadCloud = require('../config/cloudinary.js');

booksRoutes.get("/", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  res.render("books/booksSec");
})

module.exports = booksRoutes;