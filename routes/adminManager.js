//adminManager.js
var searchManager = require('./searchManager');
var formidable = require('formidable');
var fs = require('fs');
var gm = require('gm');
var imageMagick = gm.subClass({
    imageMagick: true
});
AVATAR_UPLOAD_FOLDER = '/avatar/'

function createGaussianPyramids(path, fileName, callback) {
    imageMagick(path + fileName)
        .resize(600, 600, '!')
        .autoOrient()
        .write(path + 'large/600x600_' + fileName, function(err) {
            if (err) {
                return err;
            }
            imageMagick(path + fileName)
                .resize(300, 300, '!')
                .autoOrient()
                .write(path + 'medium/300x300_' + fileName, function(err) {
                    if (err) {
                        return err;
                    }
                    imageMagick(path + fileName)
                        .resize(150, 150, '!')
                        .autoOrient()
                        .write(path + 'small/150x150_' + fileName, function(err) {
                            if (err) {
                                return err;
                            }
                            callback();
                        });
                });
        });
}

function createGaussianPyramids2L(path, fileName, callback) {
    imageMagick(path + fileName)
        .resize(150, 150, '!')
        .autoOrient()
        .write(path + 'small/150x150_' + fileName, function(err) {
            if (err) {
                return err;
            }
            callback();
        });
}

/*@brief add a new hotel
 *@param req, request
 *@param res, response
 *@param callback(qerr, req, res)
 *for callback param:
 *err is the error message, if it is null, there is no error
 *req is the request
 *res is the response
 */
exports.add_hotel_info = function(req, res, callback) {
    var sql = 'insert into HotelInfo values(';
    sql += 'null,';
    sql += ' \'' + req.body.Hotel_Name + '\',';
    sql += ' \'' + req.body.Province + '\',';
    sql += ' \'' + req.body.City + '\',';
    sql += ' \'' + req.body.Address + '\',';
    sql += ' ' + req.body.Stars + ',';
    sql += ' \'' + req.body.Description + '\',';
    sql += ' \'' + req.body.PhoneNumber + '\',';
    sql += ' ' + req.body.Discount + ' ,';
    sql += '0,0,'+req.body.Seller_ID+')';
    searchManager.query(sql, function(err) {
        callback(err, req, res);
    });
}

/*@brief add a room in a hotel
 *@param req, request
 *@param res, response
 *@param callback(qerr, req, res)
 *for callback param:
 *err is the error message, if it is null, there is no error
 *req is the request
 *res is the response
 */
exports.add_room_type = function(req, callback) {
    var sql = 'insert into RoomType values(';
    sql += req.query.Hotel_ID + ',';
    sql += ' \'' + req.body.Room_Type + '\',';
    sql += ' \'' + req.body.Details + '\',';
    sql += ' ' + req.body.Total + ')';
    searchManager.query(sql, function(err) {
        callback(err);
    });
}

/*@brief add a new airticket
 *@param req, request
 *@param res, response
 *@param callback(err, req, res)
 *for callback param:
 *err is the error message, if it is null, there is no error
 *req is the request
 *res is the response
 */
exports.add_airticket_info = function(req, res, callback) {
  console.log(req.body);
    var sql = 'insert into TicketsInfo values(';
    sql += 'null,';
    sql += ' \'' + req.body.Flight_Company + '\',';
    sql += ' \'' + req.body.Flight_No + '\',';
    sql += ' \'' + req.body.Departure + '\',';
    sql += ' \'' + req.body.Stopover + '\',';
    sql += ' \'' + req.body.Destination + '\',';
    sql += ' \'' + req.body.Depart_time + ' '+req.body.Depart_hour + ":" + req.body.Depart_minute +':00\',';
    sql += ' \'' + req.body.Stopover_time + ' '+req.body.Stopover_hour + ":" + req.body.Stopover_minute +':00\',';
    sql += ' \'' + req.body.Arrive_time + ' '+req.body.Arrive_hour + ":" + req.body.Arrive_minute +':00\',';
    sql += ' ' + req.body.Total + ',';
    sql += ' ' + req.body.Total + ',';
    sql += ' ' + req.body.Price + ',';
    sql += ' \'' + req.body.Discount + '\')';
    console.log(sql);
    searchManager.query(sql, function(err) {
        callback(err, req, res);
    });
}

/*@brief
 *@param req, request
 *@param res, response
 *@param callback(err, req, res)
 *for callback param:
 *err is the error message, if it is null, there is no error
 *req is the request
 *res is the response
 */
exports.upload_room_photo = function(req, res, callback) {
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = 'public' + AVATAR_UPLOAD_FOLDER;
    form.keepExtensions = true;
    form.maxFieldsSize = 2 * 1024 * 1024;

    form.parse(req, function(err, fields, files) {

        if (err) {
            res.locals.error = err;
            console.log(err);
            res.render('order', {
                tabChoose: 0
            });
        }

        var extName = '';
        switch (files.fulAvatar.type) {
            case 'image/pjpeg':
                extName = 'jpg';
                break;
            case 'image/jpeg':
                extName = 'jpg';
                break;
            case 'image/png':
                extName = 'png';
                break;
            case 'image/x-png':
                extName = 'png';
                break;
        }

        if (extName.length == 0) {
            res.locals.error = '只支持png和jpg格式图片';
            res.render('order', {
                tabChoose: 0
            });
            return;
        }

        var directoryName = 'Hotel_' + req.query.Hotel_ID + '/';
        var fileName = req.query.RoomType + '.' + extName;
        var newPath = form.uploadDir + directoryName + fileName;
        var rename = function() {
            fs.rename(files.fulAvatar.path, newPath, function() {
                createGaussianPyramids2L(form.uploadDir + directoryName, fileName, function(err) {
                    searchManager.query('insert into RoomTypePics values(' + req.query.Hotel_ID + ',\'' + req.query.RoomType + '\',' + '\'avatar/' + directoryName + 'small/150x150_' + fileName + '\')',
                        function(qerr) {
                            if (qerr) {
                                callback(qerr, req, res);
                                return;
                            }
                        });
                });
            });
        }
        fs.exists(form.uploadDir + directoryName, function(result) {
            if (result == false) {
                fs.mkdir(form.uploadDir + directoryName, function() {
                    fs.mkdir(form.uploadDir + directoryName + 'small', function() {
                        fs.mkdir(form.uploadDir + directoryName + 'medium', function() {
                            fs.mkdir(form.uploadDir + directoryName + 'large', rename)
                        })
                    })
                })
            } else {
                rename();
            }
        })
    });
}

/*@brief
 *@param req, request
 *@param res, response
 *@param callback(err, req, res)
 *for callback param:
 *err is the error message, if it is null, there is no error
 *req is the request
 *res is the response
 */

exports.upload_hotel_photo = function(req, res, callback) {
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = 'public' + AVATAR_UPLOAD_FOLDER;
    form.keepExtensions = true;
    form.maxFieldsSize = 2 * 1024 * 1024;

    form.parse(req, function(err, fields, files) {

        if (err) {
            res.locals.error = err;
            console.log(err);
            res.render('order', {
                tabChoose: 0
            });
        }

        var extName = '';
        switch (files.fulAvatar.type) {
            case 'image/pjpeg':
                extName = 'jpg';
                break;
            case 'image/jpeg':
                extName = 'jpg';
                break;
            case 'image/png':
                extName = 'png';
                break;
            case 'image/x-png':
                extName = 'png';
                break;
        }

        if (extName.length == 0) {
            res.locals.error = '只支持png和jpg格式图片';
            res.render('order', {
                tabChoose: 0
            });
            return;
        }

        searchManager.query('select count(Hotel_ID) from HotelPics where Hotel_ID=' + req.query.Hotel_ID, function(qerr, vals) {
            console.log(vals[0]);
            var count = vals[0]['count(Hotel_ID)'] / 4;
            var directoryName = 'Hotel_' + req.query.Hotel_ID + '/';
            var fileName = count + '.' + extName;
            var newPath = form.uploadDir + directoryName + fileName;
            var rename = function() {
                fs.rename(files.fulAvatar.path, newPath, function() {
                    createGaussianPyramids(form.uploadDir + directoryName, fileName, function(err) {
                        searchManager.query('insert into HotelPics values(' + req.query.Hotel_ID + ',' + '\'avatar/' + directoryName + 'small/150x150_' + fileName + '\')',
                            function(qerr) {
                                if (qerr) {
                                    return;
                                }
                                searchManager.query('insert into HotelPics values(' + req.query.Hotel_ID + ',' + '\'avatar/' + directoryName + 'medium/300x300_' + fileName + '\')',
                                    function(qerr) {
                                        if (qerr) {
                                            return;
                                        }
                                        searchManager.query('insert into HotelPics values(' + req.query.Hotel_ID + ',' + '\'avatar/' + directoryName + 'large/600x600_' + fileName + '\')',
                                            function(qerr) {
                                                if (qerr) {
                                                    return;
                                                }
                                                searchManager.query('insert into HotelPics values(' + req.query.Hotel_ID + ',' + '\'avatar/' + directoryName + fileName + '\')',
                                                    function(qerr) {
                                                        if (qerr) {
                                                            return;
                                                        }
                                                        callback(qerr, req, res);
                                                    });
                                            });
                                    });
                            });
                    });
                });
            }
            fs.exists(form.uploadDir + directoryName, function(result) {
                if (result == false) {
                    fs.mkdir(form.uploadDir + directoryName, function() {
                        fs.mkdir(form.uploadDir + directoryName + 'small', function() {
                            fs.mkdir(form.uploadDir + directoryName + 'medium', function() {
                                fs.mkdir(form.uploadDir + directoryName + 'large', rename)
                            })
                        })
                    })
                } else {
                    rename();
                }
            })
        })
    });
}

/*@brief delete a hotel
 *@param req, request
 *@param res, response
 *@param callback(err,req,res)
 *for callback param:
 *qerr is the query error
 *req is the request
 *res is the response
 */
exports.delete_hotel_info = function(req, res, callback) {
    if (req.query.Hotel_ID == null) {
        callback("Hotel_ID is null");
    }
    var sql = 'delete from HotelInfo where Hotel_ID=' + req.query.Hotel_ID;
    searchManager.query(sql, function(err) {
        callback(err, req, res);
    })
}

/*@brief delete an airticket
 *@param req, request
 *@param res, response
 *@param callback(err,req,res)
 *for callback param:
 *qerr is the query error
 *req is the request
 *res is the response
 */
exports.delete_airticket_info = function(req, callback) {
    if (req.query.AirTicket_ID == null) {
        callback("AirTicket_ID is null");
    }
    var sql = 'delete from TicketsInfo where AirTicket_ID=' + req.query.AirTicket_ID;
    searchManager.query(sql, function(err) {
        callback(err);
    })
}

/*@brief update a hotel info
 *@param req, request
 *@param res, response
 *@param callback(err)
 *for callback param:
 *err is the query error
 */
exports.update_hotel_info = function(Hotel_ID, Hotel_Name, Province, City, Address, Stars, Description, PhoneNumber, callback) {
    var sql = 'update HotelInfo set ';
    if (Hotel_Name != null)
        sql += 'Hotel_Name=' + '\'' + Hotel_Name + '\', ';
    if (Province != null)
        sql += 'Province=' + '\'' + Province + '\', ';
    if (City != null)
        sql += 'City=' + '\'' + City + '\', ';
    if (Address != null)
        sql += 'Address=' + '\'' + Address + '\', ';
    if (Stars != null)
        sql += 'Stars=' + Stars + ', ';
    if (Description != null)
        sql += 'Description=' + '\'' + Description + '\', '
    if (PhoneNumber != null)
        sql += 'PhoneNumber=' + '\'' + PhoneNumber + '\' ';
    sql += 'where Hotel_ID=' + Hotel_ID + ';'
    console.log(sql);
    searchManager.query(sql, function(qerr) {
        console.log(qerr);
        callback(qerr);
    })
}

/*@brief update an airticket info
 *@param req, request
 *@param res, response
 *@param callback(err)
 *for callback param:
 *err is the query error
 */
exports.update_airticket_info = function(Airticket_ID, Departure, Airport, Destination, Depart_time, Arrive_time, Total, Available, Price, callback) {
    var sql = 'update TicketsInfo set ';
    if (Departure != null)
        sql += 'Departure=' + '\'' + Departure + '\', ';
    if (Airport != null)
        sql += 'Airport=' + '\'' + Airport + '\', ';
    if (Destination != null)
        sql += 'Destination=' + '\'' + Destination + '\', ';
    if (Depart_time != null)
        sql += 'Depart_time=' + '\'' + Depart_time + '\', ';
    if (Arrive_time != null)
        sql += 'Arrive_time=' + '\'' + Arrive_time + '\', ';
    if (Total != null)
        sql += 'Total=' + Total + ', ';
    if (Available != null)
        sql += 'Available=' + Total + ', ';
    if (Price != null)
        sql += 'Price=' + Price + ' ';
    sql += 'where Airticket_ID=' + Airticket_ID + ';'
    console.log(sql);
    searchManager.query(sql, function(qerr) {
        console.log(qerr);
        callback(qerr);
    })
}

/*@brief delete room type
 *@param req, request
 *@param res, response
 *@param callback(err)
 *for callback param:
 *err is the query error
 */

exports.delete_room_type = function(Hotel_ID, Type, callback) {

    var main_sql = "delete from RoomType where Hotel_ID = " + Hotel_ID + " and Type = '" + Type + "'";

    searchManager.query(main_sql, function(qerr) {
        console.log(qerr);
        if (!qerr) {
            var clause_sql = "delete from RoomInfo where Hotel_ID = " + Hotel_ID + " and Type = '" + Type + "'";
            searchManager.query(clause_sql, function(qerr) {
                callback(qerr);
            });
        } else {
            callback(qerr);
        }
    });
}

/*
 * @Hotel_ID, Type, Room_date: conditions
 * @modify: Price
 */

function addDate(date, days) {
    var d = new Date(date);
    d.setDate(d.getDate() + days);
    var month = d.getMonth() + 1;
    var day = d.getDate();
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    var val = d.getFullYear() + "-" + month + "-" + day;
    return val;
}

exports.update_room_info = function(Hotel_ID, Type, Start_date, End_date, Available, Price, callback) {
    //date = date + 1
    var sql = "insert into RoomInfo (Hotel_ID, Type, Room_date, Available, Price) values ";
    //+ ") on duplicate key update RoomInfo set Price = " + Price;

    var insert_values = [];
    //console.log(Start_date);
    //console.log(End_date);
    for (var date = Start_date; date <= End_date; date = addDate(date, 1)) {
        //console.log(date);
        insert_values[insert_values.length] = " (" + Hotel_ID + ", '" + Type + "', '" + date + "', " + Available + ", " + Price + ") ";
    }

    for (var i = 0; i < insert_values.length - 1; i++) {
        sql = sql + insert_values[i] + ", ";
    }

    sql = sql + insert_values[insert_values.length - 1];

    sql = sql + " on duplicate key update Price = " + Price;

    searchManager.query(sql, function(qerr) {
        callback(qerr);
    });

}
