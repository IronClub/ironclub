
// To execute this seed, run from the root of the project
// $ node bin/seeds.js

require('dotenv').config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const Subsection = require('../models/Subsection');
const Section = require ('../models/Section');

//Vaciar las bases de datos
User.collection.drop();
// Post.collection.drop();
// Comment.collection.drop();
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
  {
    username: "Platanito",
    password: bcrypt.hashSync("platano", bcrypt.genSaltSync(bcryptSalt)),
    email: "banana@lover.com",
    imgPath: "/images/user2.png"
  },
];

let posts = [
  {
    title: "Curso inicio express",
    content: "Este curso es una iniciación a Express.js para todos aquellos que quieran empezar a trabajar con esta herramienta, podeis acceder a el en el siguiente link. www.codeacademy.com",
    creatorId: 0,
    subsectionId: 4,
    section: "Express"
  },
  {
    title: "Atajos de teclado para JS",
    content: "Esta librería independiente te permite añadir eventos de teclado, ya sean combinaciones o una única tecla. Te permite seleccionar si el evento se realiza al presionar o al soltar la tecla, descárgala aquí https://blog.aulaformativa.com/libreria-javascript-plugin-atajos-teclado/",
    creatorId: 1,
    subsectionId: 0,
    section: "JavaScript"
  },
  {
    title: "Setting up MongoDB Compass",
    content: "Sabemos que hay mucha gente con problemas a la hora de instalar MongoDB Compass por lo que traemos esta guía que será de bastante ayuda para todos, podeis verla aquí https://coursework.vschool.io/setting-up-mongodb-compass/",
    creatorId: 3,
    subsectionId: 5,
    section: "MongoDB"
  },
];

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
];

let sections = [
  {
    title: "Front End",
    imgPath: "/images/parents/ber1.jpg"
  },
  {
    title: "Back End",
    imgPath: "/images/parents/ber2.jpg"
  },
];

let subsections = [
  {
    title: "JavaScript",
    imgPath: "/images/subsections/js.png",
    sectionId: 0
  },
  {
    title: "CSS",
    imgPath: "/images/subsections/css3.png",
    sectionId: 0,
  },
  {
    title: "HTML5",
    imgPath: "/images/subsections/html5alt.png",
    sectionId: 0,
  },
  {
    title: "Node",
    imgPath: "/images/subsections/nodejsalt.jpg",
    sectionId: 1,
  },
  {
    title: "Express",
    imgPath: "/images/subsections/express.png",
    sectionId: 1,
  },
  {
    title: "MongoDB",
    imgPath: "/images/subsections/mongo.jpg",
    sectionId: 1,
  },
  {
    title: "Middlewares",
    imgPath: "/images/subsections/middle.png",
    sectionId: 1,
  },
];
let meetups = [
  { name: "aCharla1", description: "Pues una charla", location: { type: "Point", coordinates: [40.4189903, -3.7059249] },type:"Charla" },
  { name: "Charla2", description: "Otra charla", location: { type: "Point", coordinates: [40.4045385, -3.6988189] },type:"Charla" },
  { name: "Charla3", description: "Otra charla más", location: { type: "Point", coordinates: [40.4043078, -3.7164926] },type:"Charla" },
  { name: "bQuedada1", description: "amo a juntarno", location: { type: "Point", coordinates: [40.4143078, -3.7264926] },type:"Quedada" }
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
    return Section.deleteMany()
    .then(()=> {
      const Front = new Section(sections[0])
      return Front.save()
      // return Section.create(sections)
    })
    .then(FrontSave =>{
      const Back = new Section(sections[1])
      return Back.save()
      .then(BackSave => [FrontSave, BackSave])
    })
    .then(sections => {

      subsections.forEach((e) => e.sectionId = sections[e.sectionId]._id);
      console.log(`${sections.length} subsections created with the following id:`);
      console.log(sections.map(u => u.title));
      
      return Subsection.deleteMany()
      .then(()=> {
        return Subsection.create(subsections).catch(err => console.log(err))
      }).then(subsections => {

      
      
    
    posts.forEach((e) => {e.creatorId = usersCreated[e.creatorId]._id
      e.subsectionId = subsections[e.subsectionId]._id
    });
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
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect()
  })
  .catch(err => {
    mongoose.disconnect()
    throw err
  })
  })
