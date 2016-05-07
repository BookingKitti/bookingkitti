var express = require('express');
var router = express.Router();
var searchManager = require('./searchManager');
var filterManager = require('./filterManager');

var defaultPage = function(req, res, next) {
    searchManager.query('select * from HotelInfo', function(qerr, rows, fields) {
        res.render('searchHotel', {
            tabChoose: 0
        })
    })
}

/*@brief GET home page which is search page
 *render index.ejs
 */
router.get('/', defaultPage);

/*@brief GET search page
 *render search.ejs
 *by default select all the Hotel info
 */
router.get('/search', defaultPage);
router.get('/SearchResults',function(req,res,next){
  console.log(req.query.Hotel_ID);
})
router.post('/search', function(req, res, next) {

    filterManager.search_hotel_info(req.body.textfield_hotel_name==""?null:req.body.textfield_hotel_name,
        req.body.combobox_province==""?null:req.body.combobox_province,
        req.body.combobox_city==""?null:req.body.combobox_city,
        req.body.textfield_address==""?null:req.body.textfield_address,
        req.body.date_checkin==""?null:req.body.date_checkin,
        req.body.date_checkout==""?null:req.body.date_checkout,
        req.body.textfield_minprice==""?null:req.body.textfield_minprice,
        req.body.textfield_maxprice==""?null:req.body.textfield_maxprice,
        null,
        function(qerr, vals, fields) {
            res.render('SearchResults', {
                tabChoose: 0,
                data:vals
            });
            console.log(vals[0]);
        });
});

/*@brief GET comment page
 *render comment.ejs
 */
router.get('/comment', function(req, res, next) {
    res.render('comment', {
        tabChoose: 2
    });
});

/*@brief GET search page
 *render search.ejs
 */
router.get('/order', function(req, res, next) {
    res.render('order', {
        tabChoose: 1,
        data:"<br>"
    });
});

router.get('/test', function(req, res, next) {
    res.render('a2', {
        tabChoose: 2
    })
})

module.exports = router;
