const router = require('express-promise-router')();
const userDetails = require('../controllers/loginDetails.controller');

router.get('/userDetail', userDetails.userDetails);

module.exports = router;