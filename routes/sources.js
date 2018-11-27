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

sourcesRoutes.get("/subsections/:id", (req, res, next) => {
  console.log("entra")
  Post.find({subsectionId: req.params.id})
  .then(posts => {
  res.render("partials/sourcePartials.hbs", {posts});
})
});




sourcesRoutes.get("/:id", (req, res, next) => {
  Subsection.find({sectionId: req.params.id})
  .then(subsections => {
  res.render("sourcesCode/front-back-section", {subsections});
})
});










module.exports = sourcesRoutes;