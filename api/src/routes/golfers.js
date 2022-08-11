var express = require('express');
var router = express.Router();
const db = require('./queries')

router.get('/golfers', db.getGolfers)
router.get('/golfers/:id', db.getGolferById)
router.post('/golfers', db.createGolfer)
router.put('/golfers/:id', db.updateGolfer)
router.delete('/golfers/:id', db.deleteGolfer)

module.exports = router;