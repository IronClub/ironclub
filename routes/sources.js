require("dotenv").config();

const express = require("express");
const passport = require("passport");
const sourcesRoutes = express.Router();
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const ensureLogin = require("connect-ensure-login");
const uploadCloud = require("../config/cloudinary.js");
const Section = require("../models/Section");
const Subsection = require("../models/Subsection");

sourcesRoutes.get("/", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  Section.find({}).then(sections => {
    res.render("sourcesCode/code-dashboard", { sections, user: req.user });
  });
});

sourcesRoutes.get(
  "/subsections/:id",
  ensureLogin.ensureLoggedIn(),
  (req, res, next) => {
    Post.find({ subsectionId: req.params.id })
      .populate("creatorId", "username")
      .then(posts => {
        console.log(posts);
        res.render("partials/sourcePartials", { posts, user: req.user });
      });
  }
);

sourcesRoutes.get(
  "/post/:id",
  ensureLogin.ensureLoggedIn(),
  (req, res, next) => {
    console.log("entra");
    Post.findById(req.params.id)
      .populate("creatorId", "username")
      .then(post => {
        console.log(post);
        res.render("sourcesCode/complete-post", { post, user: req.user });
      });
  }
);

sourcesRoutes.get("/new", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("sourcesCode/newPost", {
    message: req.flash("error"),
    user: req.user
  });
});

sourcesRoutes.get("/:id", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  Subsection.find({ sectionId: req.params.id }).then(subsections => {
    res.render("sourcesCode/front-back-section", {
      subsections,
      user: req.user
    });
  });
});

sourcesRoutes.post(
  "/new",
  [ensureLogin.ensureLoggedIn(), uploadCloud.single("img")],
  (req, res, next) => {
    let creatorId = req.user.id;

    const { title, content } = req.body;

    let picPath = req.file.url;
    const newPost = new Post({
      title,
      content,
      creatorId,
      picPath
    });
    console.log(req.body.section);

    Subsection.findOne({ title: req.body.section })
      // .populate("creatorId", "username")
      .then(sub => {
        newPost.subsectionId = sub.id;

        newPost.save(err => {
          if (err) {
            res.redirect('/');
            next(null, false, { message: newPost.errors });
          }
          res.redirect('/');

          return next(null, newPost);
        });
      });
  }
);

sourcesRoutes.get(
  "/search/:title",
  ensureLogin.ensureLoggedIn(),
  (req, res) => {
    const title = decodeURI(req.params.title);
    Section.findOne({ title }).then(sec => {
      res.redirect(`/sources/${sec._id}`);
    });
  }
);

sourcesRoutes.get(
  "/subsections/search/:title",
  ensureLogin.ensureLoggedIn(),
  (req, res) => {
    const title = decodeURI(req.params.title);
    Subsection.findOne({ title }).then(sub => {
      res.redirect(`/sources/subsections/${sub._id}`);
    });
  }
);

sourcesRoutes.get("/post/delete/:id", ensureLogin.ensureLoggedIn(), (req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then(() => {
      console.log("entra dentro");
      res.redirect('/');
    })  
    .catch(err => console.log(err));
}
);

module.exports = sourcesRoutes;
