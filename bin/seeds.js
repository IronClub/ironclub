
// To execute this seed, run from the root of the project
// $ node bin/seeds.js

require('dotenv').config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const Event = require("../models/Event");

const bcryptSalt = process.env.SALT;

mongoose
  .connect(process.env.IRONCLUBDB, { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

let users = [
  {
    username: "Pepe Promise",
    password: bcrypt.hashSync("pepe", bcrypt.genSaltSync(bcryptSalt)),
    email: "pepe@promise.com",
    role: "admin",
    imgPath: "/images/admin1.png"
  },
  {
    username: "q",
    password: bcrypt.hashSync("q", bcrypt.genSaltSync(bcryptSalt)),
    email: "q@q.q"
  },
  {
    username: "Front Hater",
    password: bcrypt.hashSync("front", bcrypt.genSaltSync(bcryptSalt)),
    email: "front@hater.com",
    imgPath: "/images/fronthaterprofile.png"
  },
]



let posts = [
  {
    title: "Curso rutas express",
    content: "lorem ipsum",
    creatorId: 0,
    section: "Express"
  },
  {
    title: "Atajos para el DOM",
    content: "ipsum lorem",
    creatorId: 1,
    section: "JavaScript"
  },

]

let comments = [
  {
    content: "eso es una mierda",
    creatorId: 2,
    postId: 0
  },
  {
    content: "eso es mentira",
    creatorId: 1,
    postId: 0
  },
  {
    content: "mi post es mejor",
    creatorId: 0,
    postId: 1
  },

]


let meetups = [
  { name: "Charla1", description: "Pues una charla", location: { type: "Point", coordinates: [40.4189903, -3.7059249] } },
  { name: "Charla2", description: "Otra charla", location: { type: "Point", coordinates: [40.4045385, -3.6988189] } },
  { name: "Charla3", description: "Otra charla más", location: { type: "Point", coordinates: [40.4043078, -3.7164926] } },
  { name: "Quedada1", description: "amo a juntarno", location: { type: "Point", coordinates: [40.4143078, -3.7264926] } }
]

Event.deleteMany()
  .then(()=> {
    return Event.create(meetups)
  })

User.deleteMany()
  .then(() => {
    return User.create(users)
  })
  .then(usersCreated => {
    posts.forEach((e) => e.creatorId = usersCreated[e.creatorId]._id);
    console.log(`${usersCreated.length} users created with the following id:`);
    console.log(usersCreated.map(u => u._id));
    return Post.deleteMany()
      .then(() => {
        return Post.create(posts).catch(err => console.log(err))
      })
      .then(postsCreated => {
        console.log(`${postsCreated.length} posts created with the following id:`);
        console.log(postsCreated.map(u => u._id));
        comments.forEach((e) => {
          e.creatorId = usersCreated[e.creatorId]._id;
          e.postId = postsCreated[e.postId]._id
        }
        );
        return Comment.deleteMany()
          .then(() => {
            return Comment.create(comments).catch(err => console.log(err))
          })
          .then(commentsCreated => {
            console.log(`${commentsCreated.length} comments created with the following id:`);
            console.log(commentsCreated.map(u => u._id));

          })





      })
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect()
  })
  .catch(err => {
    mongoose.disconnect()
    throw err
  })

