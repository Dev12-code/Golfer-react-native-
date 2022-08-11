const router = require('express-promise-router')();
const { authJwt } = require("../middleware");
const golferController = require('../controllers/golfer.controller');

router.get('/golfers', [authJwt.verifyToken], golferController.listAllGolfers);
router.get('/golfers/:p_id', [authJwt.verifyToken], golferController.FindGolferByID);
router.get('/golfers/:t_id/field', [authJwt.verifyToken], golferController.listGolfersByField);
router.get('/golfers/:p_id/groupings', [authJwt.verifyToken], golferController.listGroupingsbyGolfer);
router.get('/golfers/:p_id/profile', [authJwt.verifyToken], golferController.playerProfile);
router.get('/golfers/:p_id/stats', [authJwt.verifyToken], golferController.playerStats);

module.exports = router;