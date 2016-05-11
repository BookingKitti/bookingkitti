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

/*@brief add a new hotel
*@param req, request
*@param res, response
*@param callback(req, res, qerr)
*for callback param:
*req is the request
*res is the response
*qerr is the query error message, if it is null, there is no error
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
    sql += ' \'' + req.body.PhoneNumber + '\')';
    searchManager.query(sql, function(qerr) {
        callback(req, res, qerr);
    });
}

/*@brief add a new airticket
*@param req, request
*@param res, response
*@param callback(req, res, qerr)
*for callback param:
*req is the request
*res is the response
*qerr is the query error message, if it is null, there is no error
*/
exports.add_airticket_info = function(req, res, callback) {
    var sql = 'insert into TicketsInfo values(';
    sql += 'null,';
    sql += ' \'' + req.body.Departure + '\',';
    sql += ' \'' + req.body.Airport + '\',';
    sql += ' \'' + req.body.Destination + '\',';
    sql += ' \'' + req.body.Depart_time + '\',';
    sql += ' \'' + req.body.Arrive_time + '\',';
    sql += ' \'' + req.body.Total + '\',';
    sql += ' \'' + req.body.Total + '\',';
    sql += ' \'' + req.body.Price + '\')';
    searchManager.query(sql, function(qerr) {
        callback(req, res, qerr);
    });
}

/*@brief
*@param req, request
*@param res, response
*@param callback(req, res)
*for callback param:
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

        var Hotel_ID = 1;
        searchManager.query('select count(Hotel_ID) from HotelPics where Hotel_ID=' + Hotel_ID, function(qerr, vals) {
            console.log(vals[0]);
            var count = vals[0]['count(Hotel_ID)']/4;
            var directoryName = 'Hotel_' + Hotel_ID + '/';
            var fileName = count + '.' + extName;
            var newPath = form.uploadDir + directoryName + fileName;
            var rename = function() {
                fs.rename(files.fulAvatar.path, newPath, function() {
                    createGaussianPyramids(form.uploadDir + directoryName, fileName, function(err) {
                        searchManager.query('insert into HotelPics values(' + Hotel_ID + ',' + '\'avatar/' + directoryName + 'small/150x150_' + fileName + '\')',
                            function(qerr) {
                                if (qerr) {
                                    return;
                                }
                                searchManager.query('insert into HotelPics values(' + Hotel_ID + ',' + '\'avatar/' + directoryName + 'medium/300x300_' + fileName + '\')',
                                    function(qerr) {
                                        if (qerr) {
                                            return;
                                        }
                                        searchManager.query('insert into HotelPics values(' + Hotel_ID + ',' + '\'avatar/' + directoryName + 'large/600x600_' + fileName + '\')',
                                            function(qerr) {
                                                if (qerr) {
                                                    return;
                                                }
                                                searchManager.query('insert into HotelPics values(' + Hotel_ID + ',' + '\'avatar/' + directoryName + fileName + '\')',
                                                    function(qerr) {
                                                        if (qerr) {
                                                            return;
                                                        }
                                                        callback(req, res);
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
*@param callback(req, res)
*for callback param:
*req is the request
*res is the response
*/
exports.delete_hotel_info = function(req, res, callback) {
    if(req.body.Hotel_ID==null)
    {
      var err="Hotel_ID is null"
      callback(err);
      return;
    }
}

/*@brief delete an airticket
*@param req, request
*@param res, response
*@param callback(req, res)
*for callback param:
*req is the request
*res is the response
*/
exports.delete_airticket_info = function(req, res, callback) {
    console.log('delete hotel info');
}

/*@brief delete a hotel
*@param req, request
*@param res, response
*@param callback(req, res)
*for callback param:
*req is the request
*res is the response
*/
exports.update_hotel_info = function(req, res, callback) {
    console.log('update_hotel_info');
}
