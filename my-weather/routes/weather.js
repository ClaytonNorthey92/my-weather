var express = require('express');
var router = express.Router();

router.get('/', function(request, response, next){
  response.render('weather', {});
});

module.exports = router;
