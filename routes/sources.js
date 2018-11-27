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

sourcesRoutes.get("/subsections/:id", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  console.log("entra")
  Post.find({subsectionId: req.params.id})
  .populate("creatorId", "username")
  .then(posts => {
    console.log(posts)
  res.render("partials/sourcePartials", {posts});
})
});

sourcesRoutes.get('/new', ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render('sourcesCode/newPost', { message: req.flash('error') });
});

sourcesRoutes.get("/:id", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  Subsection.find({sectionId: req.params.id})
  .then(subsections => {
    res.render("sourcesCode/front-back-section", {subsections});
  })
});

sourcesRoutes.post('/new', [ensureLogin.ensureLoggedIn(), uploadCloud.single('img')], (req, res, next) => {
  let creatorId = req.user.id;


  const {
    title,
    content,
  } = req.body;

  let picPath = req.file.url;
  const newPost = new Post({
    title,
    content,
    creatorId,
    picPath,
  });
  console.log(req.body.section)

  Subsection.findOne({title: req.body.section})
  // .populate("creatorId", "username")
  .then(sub =>{
    newPost.subsectionId = sub.id;

    newPost.save((err) => {
      if (err) { next(null, false, { message: newPost.errors }) }
      return next(null, newPost);
    });


  })


  res.redirect('/');
})



module.exports = sourcesRoutes;