const express = require('express');
const router  = express.Router();

// /* GET home page */
// router.get('/', (req, res, next) => {
//   // res.render('index');
//   res.redirect('/borrar');
// });


const sourcesRoutes = require ("../routes/sources");
router.use("/sources", sourcesRoutes);

const ocioRoutes = require ("../routes/tiempoLibre");
router.use("/ocio", ocioRoutes);


module.exports = router;
