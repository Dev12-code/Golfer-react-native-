var express = require('express');
var router = express.Router();

/* GET home page. 
router.get('/api', function(req, res, next) {
  res.render('index', { title: 'RabbitCard' });
});
*/

/* GET request */
router.get('/api', (req, res) => {
  res.status(200).send({
    success: 'true',
    crisis: "averted"
  });
});
module.exports = router;
