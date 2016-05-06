var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { tabChoose:0 });
});

router.get('/index', function(req, res, next) {
  res.render('index', { tabChoose:0 });
});

router.get('/comment',function(req,res,next){
  res.render('comment',{tabChoose:2});
});


router.get('/search',function(req,res,next){
  res.render('searchHotel',{tabChoose:1});
});

router.get('/test',function(req,res,next){
  res.render('a2',{tabChoose:2})
})


module.exports = router;
