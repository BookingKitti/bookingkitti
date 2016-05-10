//adminManager.js
var searchManager = require('./searchManager');
var formidable = require('formidable');
var fs = require('fs');
var count = 0;
TITLE = 'formidable上传示例'
AVATAR_UPLOAD_FOLDER = '/avatar/'


exports.add_hotel_info = function(Hotel_Name, Province, City, Address, Stars, Description, PhoneNumber, callback) {
    console.log("add hotel info");
}

exports.upload_hotel_photo = function(req, res) {
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

        var avatarName = 'Hotel_35_' + count + '.' + extName;
        count++;
        var newPath = form.uploadDir + avatarName;

        console.log(newPath);
        fs.renameSync(files.fulAvatar.path, newPath); //重命名
        res.send('上传成功')
    });

    res.locals.success = '上传成功';
}

exports.delete_hotel_info = function(Hotel_ID, callback) {
    console.log('delete hotel info');
}

exports.update_hotel_info = function(Hotel_ID, Hotel_Name, Province, City, Address, Stars, Description, PhoneNumber, callback) {
    console.log('update_hotel_info');
}
