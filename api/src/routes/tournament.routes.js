const router = require('express-promise-router')();
const { authJwt } = require("../middleware");
const tournamentController = require('../controllers/tournament.controller');

router.get('/tournaments', [authJwt.verifyToken], tournamentController.listAllTournaments);
router.get('/tournaments/:t_id', [authJwt.verifyToken], tournamentController.findTournamentByID);
router.get('/tournaments/season/:season', [authJwt.verifyToken], tournamentController.listTournamentsBySeason);
router.get('/tournaments/:start/:end/:t_id', [authJwt.verifyToken], tournamentController.listTournamentsByDateRange);
router.get('/:user/myrabbitcards', [authJwt.verifyToken], tournamentController.listUserRabbitCards);
router.post('/tournaments/:t_id/groupings', [authJwt.verifyToken], tournamentController.listGroupingsinTournament);
router.get('/tournaments/:t_id/groupings/:round', [authJwt.verifyToken], tournamentController.listGroupsinRound);
router.get('/tournaments/:t_id/groupings/:round/:group_id/golfers', [authJwt.verifyToken], tournamentController.listGolfersinGrouping);
router.post('/tournaments/:t_id/course', [authJwt.verifyToken], tournamentController.listCourseforTournament);
router.get('/tournaments/:t_id/course/holes', [authJwt.verifyToken], tournamentController.holesforCourse);
router.get('/tournaments/:t_id/scoreboard/:round', [authJwt.verifyToken], tournamentController.tournamentscoreboardbyRound);
router.get('/tournaments/:t_id/scoreboard/:round/:p_id', [authJwt.verifyToken], tournamentController.tournamentPlayerScorebyRound);
router.post('/tournaments/:t_id/cttp', [authJwt.verifyToken], tournamentController.tournamentCTTP);
router.get('/tournaments/:t_id/rabbitcards/:round/:cttp_flag', [authJwt.verifyToken], tournamentController.rabbitcardChoices);
router.get('/tournaments/:t_id/groupings/:round/:group_id/par3s', [authJwt.verifyToken], tournamentController.groupingsPar3s);
router.get('/tournaments/:t_id/groupings/:round/:group_id/par3s/:hole/:counter', [authJwt.verifyToken], tournamentController.specificHole);
router.post('/tournaments/:t_id/groupings/:round/:group_id/par3s/:hole/pick', [authJwt.verifyToken], tournamentController.userpickCTTP);
router.post('/tournaments/:t_id/rabbitscoreboard', [authJwt.verifyToken], tournamentController.rabbitcardRankings);
///new line 
router.get('/tournaments/t_id/:t_id/ranking/:round', [authJwt.verifyToken], tournamentController.playedRanking);
router.get('/ranking', [authJwt.verifyToken], tournamentController.allUserRanking);

const basefiller = require("../datagrab/basefillers");
router.get('/basefiller/tour', basefiller.tournamentSchedule);
router.get('/basefiller/hole', basefiller.holeInfo);
router.get('/basefiller/ranking', basefiller.worldgolfRankings);

const weekend = require("../datagrab/weekend");
// router.get('/weekend/group', weekend.groupGetter);
// router.get('/weekend/cttpCreator', weekend.cttpCreator);

//router.get('/tournaments/:t_id/rabbitcards/:round', [authJwt.verifyToken], tournamentController.rabbitcardChoicesNew);


// router.get('/query/:t_id', tournamentController.changeData);
//router.get('/query/:t_id', tournamentController.changeData);
// // router.get('/makeTour', tournamentController.makeTournament);
// router.post('/insertData/:t_id', tournamentController.insertData);

module.exports = router;
