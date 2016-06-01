var express = require('express');
var router = express.Router();
var searchManager = require('./searchManager');
var filterManager = require('./filterManager');
var commentManager = require('./commentManager');
var bookingManager = require('./bookingManager');
var adminManager = require('./adminManager');
var hotManager = require('./hotManager');
var path = require('path')
var session = require('express-session')
router.use(express.static(path.join(__dirname, '../public')));
router.use(session({
    secret: 'paykitty',
    name: 'cookiespace',
    cookie: {
        maxAge: 6000
    },
    resave: false,
    saveUninitialized: true,
}));

var defaultPage = function(req, res) {

    res.render('Search', {
        date_checkin: '26 五月 2016',
        date_checkout: '26 五月 2016',
        AccountName: req.session.name
    });
}

var showAdminDetail = function(req, res, Hotel_ID) {
    var data_hotel;
    var data_room;
    var data_image;
    var data_room_image;
    var count = 0;
    bookingManager.get_room_pics(Hotel_ID, function(qerr, vals) {
        data_room_image = vals;
        console.log("我要输出了哦");
        console.log(vals);
        count++;
        if (qerr) {
            console.log('Fatal error: Cannot get room pics');
        } else {
            if (count == 5) {
                res.render('HotelDetailManage', {
                    HotelInfo: data_hotel,
                    RoomType: data_room,
                    url: "/uploadHotelPics?Hotel_ID=" + data_hotel[0].Hotel_ID,
                    FilePos: data_image,
                    RoomImg: data_room_image,
                    AccountName: req.session.name
                });
            }
        }
    })
    searchManager.query('select * from HotelPics where Hotel_ID=' + Hotel_ID + ' and ' + 'File_Pos like \'%600x600%\'', function(qerr, vals) {
        data_image = vals;
        count++;
        if (qerr) {
            console.log('Fatal error: Cannot get hotel info');
        } else {
            if (count == 5) {
                res.render('HotelDetailManage', {
                    HotelInfo: data_hotel,
                    RoomType: data_room,
                    url: "/uploadHotelPics?Hotel_ID=" + data_hotel[0].Hotel_ID,
                    FilePos: data_image,
                    RoomImg: data_room_image,
                    AccountName: req.session.name
                });
            }
        }
    })
    bookingManager.get_hotel_info(Hotel_ID,
        function(qerr, vals, fields) {
            data_hotel = vals;
            count++;
            if (qerr) {
                console.log('Fatal error: Cannot get hotel info');
            } else {
                if (count == 5) {
                    res.render('HotelDetailManage', {
                        HotelInfo: data_hotel,
                        RoomType: data_room,
                        url: "/uploadHotelPics?Hotel_ID=" + data_hotel[0].Hotel_ID,
                        FilePos: data_image,
                        RoomImg: data_room_image,
                        AccountName: req.session.name
                    });
                }
            }
        });
    bookingManager.get_room_type(Hotel_ID, function(qerr, vals, fields) {
        data_room = vals;
        console.log(data_room);
        count++;
        if (qerr) {
            console.log('Fatal error: cannot get room type');
        } else {
            if (count == 5) {
                res.render('HotelDetailManage', {
                    HotelInfo: data_hotel,
                    RoomType: data_room,
                    url: "/uploadHotelPics?Hotel_ID=" + data_hotel[0].Hotel_ID,
                    FilePos: data_image,
                    RoomImg: data_room_image,
                    AccountName: req.session.name
                });
            }
        }
    });
    commentManager.get_hotel_comment(Hotel_ID,
        function(qerr, vals, fields) {
            data_comment = vals;
            count++;
            if (qerr) {
                console.log('Fatal error: cannot get room info');
            } else {
                if (count == 5) {
                    res.render('HotelDetailManage', {
                        HotelInfo: data_hotel,
                        RoomType: data_room,
                        url: "/uploadHotelPics?Hotel_ID=" + data_hotel[0].Hotel_ID,
                        FilePos: data_image,
                        RoomImg: data_room_image,
                        AccountName: req.session.name
                    });
                }
            }
        });
};

var showDetail = function(req, res) {
    var data_hotel;
    var data_room;
    var data_comment;
    var data_image;
    var data_room_image;
    var count = 0;
    var min, max;
    bookingManager.get_room_pics(req.query.Hotel_ID, function(qerr, vals) {
        data_room_image = vals;
        count++;
        if (qerr) {
            console.log('Fatal error: Cannot get room pics');
        } else {
            if (count == 5) {
                res.render('HotelDetail', {
                    tabChoose: 0,
                    HotelInfo: data_hotel,
                    RoomInfo: data_room,
                    Price: min + "-" + max,
                    Comment: data_comment,
                    url: req.originalUrl,
                    FilePos: data_image,
                    RoomImg: data_room_image,
                    date_checkin: req.session.Date_From,
                    date_checkout: req.session.Date_To,
                    AccountName: req.session.name
                });
            }
        }
    })
    searchManager.query('select * from HotelPics where Hotel_ID=' + req.query.Hotel_ID + ' and ' + 'File_Pos like \'%600x600%\'', function(qerr, vals) {
        data_image = vals;
        count++;
        if (qerr) {
            console.log('Fatal error: Cannot get hotel info');
        } else {
            if (count == 5) {
                res.render('HotelDetail', {
                    tabChoose: 0,
                    HotelInfo: data_hotel,
                    RoomInfo: data_room,
                    Price: min + "-" + max,
                    Comment: data_comment,
                    url: req.originalUrl,
                    FilePos: data_image,
                    RoomImg: data_room_image,
                    date_checkin: req.session.Date_From,
                    date_checkout: req.session.Date_To,
                    AccountName: req.session.name
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
                if (count == 5) {
                    res.render('HotelDetail', {
                        tabChoose: 0,
                        HotelInfo: data_hotel,
                        RoomInfo: data_room,
                        Price: min + "-" + max,
                        Comment: data_comment,
                        url: req.originalUrl,
                        FilePos: data_image,
                        RoomImg: data_room_image,
                        date_checkin: req.session.Date_From,
                        date_checkout: req.session.Date_To,
                        AccountName: req.session.name
                    });
                }
            }
        });
    bookingManager.get_room_info(req.query.Hotel_ID, req.session.Date_From, req.session.Date_To,
        function(qerr, vals, fields) {
            data_room = vals;
            count++;
            if (qerr) {
                console.log('Fatal error: cannot get room info');
            } else {
                console.log(vals[0]);
                if (vals[0] == undefined) {
                    min = 0;
                    max = 0;
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
                }
                if (count == 5) {
                    res.render('HotelDetail', {
                        tabChoose: 0,
                        HotelInfo: data_hotel,
                        RoomInfo: data_room,
                        Price: min + "-" + max,
                        Comment: data_comment,
                        url: req.originalUrl,
                        FilePos: data_image,
                        RoomImg: data_room_image,
                        date_checkin: req.session.Date_From,
                        date_checkout: req.session.Date_To,
                        AccountName: req.session.name
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
            } else {
                if (count == 5) {
                    res.render('HotelDetail', {
                        tabChoose: 0,
                        HotelInfo: data_hotel,
                        RoomInfo: data_room,
                        Price: min + "-" + max,
                        Comment: data_comment,
                        url: req.originalUrl,
                        FilePos: data_image,
                        RoomImg: data_room_image,
                        date_checkin: req.session.Date_From,
                        date_checkout: req.session.Date_To,
                        AccountName: req.session.name
                    });
                }
            }
        });
};

/*@brief GET home page which is default search page
 *render search.ejs
 */
function yaowang() {
    this.HotelInfo = 'name';
    this.Hotel_ID = 'age';
    this.Hotel_Name = 'location';
}
router.get('/test', function(req, res, next) {
    console.log("test-=======================");
    filepath = ['avatar/Hotel_1/small/150x150_0.png', 'avatar/Hotel_2/small/150x150_0.png', 'avatar/Hotel_3/small/150x150_0.png'];
    var vals = new Array();
    vals[0] = new yaowang();
    vals[1] = new yaowang();
    vals[2] = new yaowang();
    vals[0].Hotel_ID = vals[1].Hotel_ID = vals[2].Hotel_ID = 1
    vals[0].HotelInfo = vals[1].HotelInfo = vals[2].HotelInfo = '来自保加利亚的好酒店'
    vals[0].Hotel_Name = vals[1].Hotel_Name = vals[2].Hotel_Name = 'XON'
    bookingManager.send_hotel_order_info(1, 1, res, function() {
        res.render()
    });
    // res.render('OrderDetail', {
    //     OrderType:'Ticket',
    //     Departure:'杭州',
    //     Destination:'上海',
    //     Depart_time:'2015-05-05',
    //     RoomImg:"avatar/Hotel_1/small/150x150_0.png",
    //     ID:'Azis',
    //     TotalPrice:1000,
    //     DiscountHotelPic: filepath,
    //     HotHotel: vals,
    //     DiscountHotel: vals,
    //     data: vals,
    //     searchID: 1,
    //     AccountName:req.session.name
    // })

})

router.get('/SearchHotelResults', function(req, res, next) {
    //req.body.
    //if(req.query.SortBy == "" )
    filterManager.sort_hotel(req.query.SearchID, req.query.SortBy, 0,
        function(qerr, vals, fields) { //还需要修改
            if (qerr) {
                console.log("database error in sort of index");
                return;
            }
            res.render('SearchHotelResults', {
                tabChoose: 0,
                data: vals,
                searchID: req.query.SearchID,
                date_checkin: req.session.Date_From,
                date_checkout: req.session.Date_To,
                AccountName: req.session.name
            })
        });
})

router.get('/SearchTicketsResults', function(req, res, next) {
    console.log('SearchTicketsResults'); //debug
    console.log(req.query.SearchID);
    console.log(req.query.SortBy);
    //req.body.
    //if(req.query.SortBy == "" )
    filterManager.sort_airticket(req.query.SearchID, req.query.SortBy, 1,
        function(qerr, vals, fields) { //还需要修改
            if (qerr) {
                console.log("database error in sort of index");
                return;
            }
            res.render('SearchTicketsResults', {
                tabChoose: 0,
                data: vals,
                searchID: req.query.SearchID,
                AccountName: req.session.name
            })
        });
})


router.get('/', function(req, res, next) {
    console.log("root router===================================");
    console.log(req.session);
    count = 0;
    var hot_hotel;
    var dis_hotel;
    hotManager.select_discounted_hotel(
        function(qerr, vals, fields) { //还需要修改
            if (qerr) {
                console.log("database error in root of index");
                return;
            }
            dis_hotel = vals;
            count++;
            if (count == 2) {
                res.render('Search', {
                    HotHotel: hot_hotel,
                    DiscountHotel: dis_hotel,
                    date_checkin: '26 五月 2016',
                    date_checkout: '27 五月 2016',
                    true_checkin: '2016-05-26',
                    true_checkout: '2016-05-27',
                    AccountName: req.session.name
                })
            }
        });
    hotManager.select_hot_hotel(
        function(qerr, vals, fields) { //还需要修改
            if (qerr) {
                console.log("database error in root of index");
                return;
            }
            hot_hotel = vals;
            count++;
            if (count == 2) {
                res.render('Search', {
                    HotHotel: hot_hotel,
                    DiscountHotel: dis_hotel,
                    date_checkin: '26 五月 2016',
                    date_checkout: '27 五月 2016',
                    true_checkin: '2016-05-26',
                    true_checkout: '2016-05-27',
                    AccountName: req.session.name
                })
            }
        });
});

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
    console.log(req.body);
    req.session.Date_From = req.body.date_checkin;
    req.session.Date_To = req.body.date_checkout;
    console.log(req.session);
    filterManager.search_hotel_info(req.body.textfield_hotel_name == "" ? null : req.body.textfield_hotel_name,
        req.body.combobox_province == "" ? null : req.body.combobox_province,
        req.body.combobox_city == "" ? null : req.body.combobox_city,
        req.body.textfield_address == "" ? null : req.body.textfield_address,
        req.body.date_checkin == "" ? null : req.body.date_checkin,
        req.body.date_checkout == "" ? null : req.body.date_checkout,
        req.body.textfield_minprice == "" ? null : req.body.textfield_minprice,
        req.body.textfield_maxprice == "" ? null : req.body.textfield_maxprice,
        function(qerr, vals, fields, search_ID) { //还需要修改
            res.render('SearchHotelResults', {
                tabChoose: 0,
                data: vals,
                searchID: search_ID,
                date_checkout: req.session.Date_To,
                date_checkin: req.session.Date_From,
                AccountName: req.session.name
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
        function(qerr, vals, fields, search_ID) {
            res.render('SearchTicketsResults', {
                tabChoose: 0,
                searchID: search_ID,
                data: vals,
                AccountName: req.session.name
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

});

/*@brief GET comment page
 *render comment.ejs
 */
router.get('/comment', function(req, res) {
    res.render('comment', {
        tabChoose: 2,
        AccountName: req.session.name
    });
});

/*@brief POST comment page
 *parse input and call commentManager
 *return the comments of the hotel
 */
router.post('/comment', function(req, res, next) {
    commentManager.add_hotel_comment(req.query.Hotel_ID,
        parseFloat(req.body.rating),
        1,
        req.body.content == "" ? null : req.body.content,
        function(qerr, vals, fields) {
            if (qerr) {
                console.log('Comment failed');
                res.send('Comment failed');
            } else {
                console.log('Comment succeed');
                showDetail(req, res);
            }
        });
});

/*@brief GET search page
 *render search.ejs
 */
router.get('/orderconfirm', function(req, res) {
    res.render('OrderDetail', {
        tabChoose: 1,
        AccountName: req.session.name
    })
})

router.post('/bookHotel', function(req, res) {
    //bookingManager.create_order_hotel()
    console.log(req.body);
    console.log(req.query);
    bookingManager.create_order_hotel(req.session.user_id,
        req.query.Hotel_ID,
        req.query.RoomType,
        req.body.date_checkin,
        req.body.date_checkout,
        function(qerr, vals, fields) {
            bookingManager.send_hotel_order_info(req.session.user_id, req.query.Hotel_ID, res, function() {
                showDetail(req, res);
            });
        });
})

var adminSearchHotel = function(req, res) {
    filterManager.search_admin_hotel_info(req.body.textfield_hotel_name == "" ? null : req.body.textfield_hotel_name,
        req.body.combobox_province == "" ? null : req.body.combobox_province,
        req.body.combobox_city == "" ? null : req.body.combobox_city,
        req.body.textfield_address == "" ? null : req.body.textfield_address,
        req.body.date_checkin == "" ? null : req.body.date_checkin,
        req.body.date_checkout == "" ? null : req.body.date_checkout,
        req.body.textfield_minprice == "" ? null : req.body.textfield_minprice,
        req.body.textfield_maxprice == "" ? null : req.body.textfield_maxprice,
        function(qerr, vals, fields) { //还需要修改
            res.render('HotelManage', {
                tabChoose: 0,
                data: vals,
                AccountName: req.session.name
            })
        });
}

var adminSearchTicket = function(req, res) {
    filterManager.search_airticket_info(req.body.Departure == "" ? null : req.body.Departure,
        req.body.Destination == "" ? null : req.body.Destination,
        req.body.Depart_time == "" ? null : req.body.Depart_time,
        req.body.minprice == "" ? null : req.body.minprice,
        req.body.maxprice == "" ? null : req.body.maxprice,
        function(qerr, vals, fields, search_ID) {
            res.render('TicketManage', {
                tabChoose: 0,
                searchID: search_ID,
                data: vals,
                AccountName: req.session.name
            })
        });
}

// router.get('/admin/avatar',function(req,res){
//   console.log(req.originalUrl);
//   res.sendfile(req.originalUrl.substring(6,req.originalUrl.length-6))
// })
router.get('/admin', function(req, res, next) {
    adminSearchHotel(req, res);
});

router.post('/adminSearchHotel', adminSearchHotel);

router.post('/adminSearchTicket', adminSearchTicket);

router.post('/addHotel', function(req, res) {
    adminManager.add_hotel_info(req, res, function(err, req, res) {
        adminSearchHotel(req, res);
    })
})

router.post('/addTickets', function(req, res) {
    adminManager.add_airticket_info(req, res, function() {
        adminSearchHotel(req, res);
    })
})

router.get('/deleteHotel', function(req, res) {
    adminManager.delete_hotel_info(req, res, function(qerr, req, res) {
        adminSearchHotel(req, res);
    })
})

router.post('/addRoom', function(req, res) {
    console.log(req.body);
    console.log(req.query);
    adminManager.add_room_type(req, function(err) {
        if (!err) {
            showAdminDetail(req, res, req.query.Hotel_ID);
        } else {
            console.log(err);
        }
    })
})

router.get('/deleteRoom', function(req, res) {
    adminManager.delete_room_type(req.query.Hotel_ID,
        req.query.RoomType,
        function(err) {
            if (!err) {
                showAdminDetail(req, res, req.query.Hotel_ID);
            } else {
                console.log(err);
            }
        })
})

router.post('/modifyRoom', function(req, res) {
    console.log("djiawudj");
    console.log(req.body);
    console.log(req.query);
    adminManager.update_room_info(req.query.Hotel_ID, req.query.RoomType, req.body.date_start, req.body.date_end, req.query.Available, req.body.Price, function(err) {
        if (!err) {
            showAdminDetail(req, res, req.query.Hotel_ID);
        } else {
            console.log(err);
        }
    });
})

router.post('/updateHotel', function(req, res) {
    adminManager.update_hotel_info(req.query.Hotel_ID,
        req.body.Hotel_Name,
        req.body.Province,
        req.body.City,
        req.body.Address,
        req.body.Stars,
        req.body.Description,
        req.body.PhoneNumber,
        function(qerr) {
            showAdminDetail(req, res, req.query.Hotel_ID);
        });
})

router.post('/uploadRoomPics', function(req, res) {
    adminManager.upload_room_photo(req, res, function(err, req, res) {
        // body...
        console.log(err);
        showAdminDetail(req, res, req.query.Hotel_ID);
    })
})

router.get('/deleteAirTicket', function(req, res) {
    // body...
    adminManager.delete_airticket_info(req, function(err) {
        // body...
        adminSearchTicket(req, res);
    })
})

router.get('/hotelDetailManage', function(req, res) {
    showAdminDetail(req, res, req.query.Hotel_ID);
});

router.post('/uploadHotelPics', function(req, res) {
    adminManager.upload_hotel_photo(req, res, function(qerr, req, res) {
        showAdminDetail(req, res, req.query.Hotel_ID);
    })
})

router.get('/avatar', function(req, res) {
    res.sendfile(req.originalUrl)
})
router.get('/getdetail', function(req, res, next) {
    var temp = req.query.ID
    var Hotel_ID;
    var AirTicket_ID;
    if (temp.charAt(0) == 'H') Hotel_ID = temp.substring(1, temp.length)
    else if (temp.charAt(0) == 'T') AirTicket_ID = temp.substring(1, temp.length)
    console.log('getdetail', Hotel_ID, AirTicket_ID);
    if (typeof Hotel_ID != 'undefined') {
        bookingManager.send_hotel_detailed_info(Hotel_ID, function(plist) {
            console.log(plist);
            res.send(plist)
        })
    }
    if (typeof AirTicket_ID != 'undefined') {
        bookingManager.send_airticket_detailed_info(AirTicket_ID, function(plist) {
          console.log(plist);
            res.send(plist)
        })
    }
})
module.exports = router;
