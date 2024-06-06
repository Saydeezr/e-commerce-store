const router = require('express').Router();
const apiRoutes = require('./api');

//Is this middleware to go through the api route files?
router.use('/api', apiRoutes);

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;