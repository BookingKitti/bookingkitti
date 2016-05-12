var express = require('express');
var router = express.Router();
var searchManager = require('./searchManager');
var filterManager = require('./filterManager');
var commentManager = require('./commentManager');
var bookingManager = require('./bookingManager');
var adminManager = require('./adminManager');

var defaultPage = function(req, res) {
    res.render('Search', {
        tabChoose: 0
    });
}

var showDetail = function(req, res) {
    var data_hotel;
    var data_room;
    var data_comment;
    var data_image;
    var count = 0;
    var min, max;
    searchManager.query('select * from HotelPics where Hotel_ID=' + req.query.Hotel_ID + ' and ' + 'File_Pos like \'%600x600%\'', function(qerr, vals) {
        data_image = vals;
        count++;
        if (qerr) {
            console.log('Fatal error: Cannot get hotel info');
        } else {
            if (count == 4) {
                res.render('HotelDetail', {
                    tabChoose: 0,
                    HotelInfo: data_hotel,
                    RoomInfo: data_room,
                    Price: min + "-" + max,
                    Comment: data_comment,
                    url: req.originalUrl,
                    FilePos: data_image
                });
            }
        }
    })
    bookingManager.get_hotel_info(req.query.Hotel_ID,
        function(qerr, vals, fields) {
            data_hotel = vals;
            count++;
            if (qerr) {
                console.log('Fatal error: Cannot get hotel info');
            } else {
                if (count == 4) {
                    res.render('HotelDetail', {
                        tabChoose: 0,
                        HotelInfo: data_hotel,
                        RoomInfo: data_room,
                        Price: min + "-" + max,
                        Comment: data_comment,
                        url: req.originalUrl,
                        FilePos: data_image
                    });
                }
            }
        });
    Date_From="2016/5/12";
    Date_To="2016/5/13";
    bookingManager.get_room_info(req.query.Hotel_ID,Date_From,Date_To,
        function(qerr, vals, fields) {
            data_room = vals;
            count++;
            if (qerr) {
                console.log('Fatal error: cannot get room info');
            } else {
                min = vals[0]['avg(Price)'];
                max = vals[0]['avg(Price)'];
                for (var i = 0; i < vals.length; i++) {
                    if (vals[i]['avg(Price)'] > max) {
                        max = vals[i]['avg(Price)'];
                    }
                    if (vals[i]['avg(Price)'] < min) {
                        min = vals[i]['avg(Price)'];
                    }
                }
                if (count == 4) {
                    res.render('HotelDetail', {
                        tabChoose: 0,
                        HotelInfo: data_hotel,
                        RoomInfo: data_room,
                        Price: min + "-" + max,
                        Comment: data_comment,
                        url: req.originalUrl,
                        FilePos: data_image
                    });
                }
            }
        });
    commentManager.get_hotel_comment(req.query.Hotel_ID,
        function(qerr, vals, fields) {
            data_comment = vals;
            count++;
            if (qerr) {
                console.log('Fatal error: cannot get room info');
            } else {cas95123
                if (count == 4) {
                    res.render('HotelDetail', {
                        tabChoose: 0,
                        HotelInfo: data_hotel,
                        RoomInfo: data_room,
                        Price: min + "-" + max,
                        Comment: data_comment,
                        url: req.originalUrl,
                        FilePos: data_image
                    });
                }
            }
        });
};

/*@brief GET home page which is default search page
 *render search.ejs
 */
router.get('/', defaultPage);

/*@brief GET search page
 *render search.ejs
 */
router.get('/search', defaultPage);

/*@brief POST searchHotel page
 *parse input and call filterManager
 *by default return all the Hotel info
 *render searchResults.ejs
 */
router.post('/searchHotel', function(req, res) {
    filterManager.search_hotel_info(req.body.textfield_hotel_name == "" ? null : req.body.textfield_hotel_name,
        req.body.combobox_province == "" ? null : req.body.combobox_province,
        req.body.combobox_city == "" ? null : req.body.combobox_city,
        req.body.textfield_address == "" ? null : req.body.textfield_address,
        req.body.date_checkin == "" ? null : req.body.date_checkin,
        req.body.date_checkout == "" ? null : req.body.date_checkout,
        req.body.textfield_minprice == "" ? null : req.body.textfield_minprice,
        req.body.textfield_maxprice == "" ? null : req.body.textfield_maxprice,
        null,
        null,
        function(qerr, vals, fields) {
            res.render('SearchHotelResults', {
                tabChoose: 0,
                data: vals
            })
        });
});

/*@brief POST searchTicket page
 *parse input and call filterManager
 *by default return all the Hotel info
 *render searchResults.ejs
 */
router.post('/searchTicket', function(req, res) {
    filterManager.search_airticket_info(req.body.Departure == "" ? null : req.body.Departure,
        req.body.Destination == "" ? null : req.body.Destination,
        req.body.Depart_time == "" ? null : req.body.Depart_time,
        req.body.minprice == "" ? null : req.body.minprice,
        req.body.maxprice == "" ? null : req.body.maxprice,
        null,
        null,
        function(qerr, vals, fields) {
            res.render('SearchTicketsResults', {
                tabChoose: 0,
                data: vals
            })
        });
});

/*@brief GET searchResults page
 *render the HotelDetail.ejs
 *pass Hotel_ID by URL
 */
router.get('/hotelDetail', showDetail);

/*@brief POST  page
 *handle the generating order post
 */
router.post('/hotelDetail', function(req, res) {
    console.log('Hotel Detail');
});

/*@brief GET comment page
 *render comment.ejs
 */
router.get('/comment', function(req, res) {
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
                req.query.Hotel_ID = 1;
                showDetail(req, res);
            }
        });
});

/*@brief GET search page
 *render search.ejs
 */
router.get('/orderconfirm', function(req, res) {
    res.render('OrderDetail', {
        tabChoose: 1
    })
})
router.get('/order', function(req, res) {
    res.render('Order', {
        tabChoose: 1,
        data: "<br>"
    });
});

router.post('/order', function(req, res) {
    for (var attribute in req.body) {
        if (attribute == "") {
            console.log("请填写必要信息");
            res.render('Order');
        }
    }
    adminManager.add_hotel_info(req, res,
        function(qerr, req, res) {
            if (!qerr)
                res.send('添加成功');
        });
});

router.post('/orderupload', function(req, res) {
    adminManager.upload_hotel_photo(req, res, function(qerr, req, res) {
        res.locals.success = '上传成功';
        res.render('Order', {
            tabChoose: 1
        });
    });
})


module.exports = router;
