var express = require('express');
var router = express.Router();
var searchManager = require('./searchManager');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { tabChoose:0 , data:'丁诗伦大酒店'});
});

router.get('/index', function(req, res, next) {
  searchManager.query('select * from HotelInfo', function (qerr, rows, fields) {
    res.render('index', { tabChoose:0, data:rows[0].Province})
  })
});

router.post('/index', function(req, res, next){
  console.log(req.body);
  res.render('index', { tabChoose:0, data:'提交成功'})
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
