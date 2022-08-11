const router = require('express-promise-router')();
const { authJwt } = require("../middleware");
const notificationConfig = require('./testnotification.config');

router.get('/send', notificationConfig.sendNotification);

module.exports = router;