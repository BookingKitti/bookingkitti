var searchManager = require('./searchManager');

exports.select_discounted_hotel = function(callback) {
    var sql = "select * from HotelInfo where Discount < 1.0";
    searchManager.query(sql, function(qerr, vals, fields) {
        if (callback != null)
            callback(qerr, vals, fields);
    });
}

exports.select_discounted_airticket = function(callback) {
    var sql = "select * from TicketsInfo where Discount < 1.0";
    searchManager.query(sql, function(qerr, vals, fields) {
        if (callback != null)
            callback(qerr, vals, fields);
    });
}

exports.update_hotel_heat = function() {
    
}
