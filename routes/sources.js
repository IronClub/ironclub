require('dotenv').config();

const express = require("express");
const passport = require('passport');
const sourcesRoutes = express.Router();
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const ensureLogin = require("connect-ensure-login");
const uploadCloud = require('../config/cloudinary.js');
const Section = require('../models/Section');
const Subsection = require('../models/Subsection');


sourcesRoutes.get("/", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  Section.find({})
  .then(sections => {

    res.render("sourcesCode/code-dashboard", {sections});
  })
});

sourcesRoutes.get("/sources", (req, res, next) => {
  res.render("sourcesCode/front-back-section");
});


module.exports = sourcesRoutes;