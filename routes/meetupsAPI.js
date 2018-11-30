require('dotenv').config();

const express = require("express");
const meetupsAPIRouter = express.Router();
const Event = require("../models/Event");
const ensureLogin = require("connect-ensure-login");


meetupsAPIRouter.get("/", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  Event.find().then(events => {
    res.json(events);
  })
    .catch(err => console.log(err));
});

meetupsAPIRouter.get("/search", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  let sortBy = req.query.sort;
  delete req.query.sort;
  if (req.query.name !== undefined) {
    req.query.name = new RegExp(req.query.name, "gi");
  }
  Event.find(req.query).then(events => {
    events = Array.from(events).sort((a, b) => {
      return a[sortBy].localeCompare(b[sortBy]);
    })
    res.json(events)
  })
    .catch(err => console.log(err));
});

meetupsAPIRouter.post("/", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  let { name, description, latitude, longitude,type} = req.body;
  let creatorId=req.user.id;
  Event.add(name, description, latitude, longitude,type,creatorId)
    .then((data) => {
      res.json(data)
    })
    .catch(err => console.log(err));
});

meetupsAPIRouter.delete("/:id", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  Event.findById(req.params.id)
    .then(event => {
      if (req.user.id == event.creatorId) {
         Event.findByIdAndDelete(req.params.id)
         .then(() => res.json({msg:"Delete"}))
      }
    })
    .catch(err => console.log(err));
});
meetupsAPIRouter.get("/areyou/:id",ensureLogin.ensureLoggedIn(), (req, res) => {
  console.log(req.params.id,req.user.id);
  let amI=req.params.id==req.user.id;
  return res.json({iamI: amI});
})
// meetupsAPIRouter.patch("/:id", ensureLogin.ensureLoggedIn(), (req, res, next) => {
//   let { name, description, latitude, longitude } = req.body;
//   Event.findById(req.params.id)
//   Event.update(name, description, latitude, longitude)
//     .then((data) => {
//       res.json(data)
//     })
//     .catch(err => console.log(err));
// });



module.exports = meetupsAPIRouter;