var express = require('express');
var router = express.Router();
var searchManager = require('./searchManager');
var filterManager = require('./filterManager');
var commentManager = require('./commentManager');
var bookingManager = require('./bookingManager');

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

/*@brief GET searchResults page
 *render the hotel detail page
 */
router.get('/searchResults', function(req, res) {
    var data_hotel;
    var data_room;
    var count = 0;
    bookingManager.get_hotel_info(req.query.Hotel_ID,
        function(qerr, vals, fields) {
            data_hotel = vals;
            count++;
            if (qerr) {
                console.log('Fatal error: Cannot get hotel info');
            } else {
                if (count == 2) {
                    res.render('HotelDetail', {
                        tabChoose: 1,
                        HotelInfo: data_hotel,
                        RoomInfo: data_room
                    });
                }
            }
        });
    bookingManager.get_room_info(req.query.Hotel_ID,
        function(qerr, vals, fields) {
            data_room = vals;
            count++;
            if (qerr) {
                console.log('Fatal error: cannot get room info');
            } else {
                var min=vals[0].price;
                var max=vals[0].price;
                for(var i=0;i<vals.length;i++){
                  if(vals[i].price>max){
                    max=vals[i].price;
                  }
                  if(vals[i].price<min){
                    min=vals[i].price;
                  }
                }
                if (count == 2) {
                    res.render('HotelDetail', {
                        tabChoose: 1,
                        HotelInfo: data_hotel,
                        RoomInfo: data_room,
                        price: min+"-"+max
                    });
                }
            }
        });
})

/*@brief POST searchResults page
 *handle the generating order post
 */
router.post('/searchResults', function(req, res) {
    req
})

/*@brief POST search page
 *parse input and call filterManager
 *by default return all the Hotel info
 */
router.post('/search', function(req, res, next) {

    filterManager.search_hotel_info(req.body.textfield_hotel_name == "" ? null : req.body.textfield_hotel_name,
        req.body.combobox_province == "" ? null : req.body.combobox_province,
        req.body.combobox_city == "" ? null : req.body.combobox_city,
        req.body.textfield_address == "" ? null : req.body.textfield_address,
        req.body.date_checkin == "" ? null : req.body.date_checkin,
        req.body.date_checkout == "" ? null : req.body.date_checkout,
        req.body.textfield_minprice == "" ? null : req.body.textfield_minprice,
        req.body.textfield_maxprice == "" ? null : req.body.textfield_maxprice,
        null,
        function(qerr, vals, fields) {
            console.log(vals);
            res.render('searchResults', {
                tabChoose: 0,
                data: vals
            })
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

/*@brief POST comment page
 *parse input and call commentManager
 *return the comments of the hotel
 */
router.post('/comment', function(req, res, next) {
    commentManager.add_hotel_comment(1,
        parseFloat(req.body.rating),
        1,
        req.body.content == "" ? null : req.body.content,
        function(qerr, vals, fields) {
            if (qerr) {
                console.log('Comment failed');
                res.send('Comment failed');
            } else {
                console.log('Comment succeed');
                res.render('order', {
                    tabChoose: 1,
                    data: vals
                });
            }
        });
});

/*@brief GET search page
 *render search.ejs
 */
router.get('/order', function(req, res, next) {
    res.render('order', {
        tabChoose: 1,
        data: "<br>"
    });
});

router.get('/test', function(req, res, next) {
    res.render('a2', {
        tabChoose: 2
    })
})

module.exports = router;
