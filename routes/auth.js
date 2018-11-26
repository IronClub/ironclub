require('dotenv').config();

const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const Post = require("../models/Post");

const Comment = require("../models/Comment");
const ensureLogin = require("connect-ensure-login");

const uploadCloud = require('../config/cloudinary.js');



// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = parseInt(process.env.BCRYPTSALT);


router.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error"), layout: false });
});

router.get("/", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  Post.find({})
    .then(posts => {
      Comment.find({}).then((comments) => {z
        res.render("index", { "message": req.flash("error"), posts, comments, user: req.user });
      }
      )})
    //TODO manejar error
    .catch(error => console.log(error));
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));

router.get("/signup", (req, res, next) => {
  res.render("auth/signup", { layout: false });
});

router.post("/signup", uploadCloud.single('img'), (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  if (username === "" || password === "" || email === "") {
    res.render("auth/signup", { message: "Indicate username, password and email" });
    return;
  }

  User.findOne({ email }, "email", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The email already exists" });
      return;
    }
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass,
      email
    });

    if (req.file !== undefined) {
      newUser.imgPath = req.file.url;
    }

    newUser.save()
      .then(() => {
        res.redirect("/");
      })
      .catch(err => {
        res.render("auth/signup", { message: "Something went wrong" });
      })
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
