var searchManager = require('./searchManager');

exports.get_hotel_info = function(hotel_id, callback) {
    var sql = "select * from HotelInfo where Hotel_ID= " + hotel_id + " ;";
    searchManager.query(sql, function(qerr, vals, fields) {
        if (callback != null) callback(qerr, vals, fields);
    });
}
exports.get_room_info = function(hotel_id, callback) {
    var sql = "select * from RoomInfo where Hotel_ID= " + hotel_id + " ;";
    searchManager.query(sql, function(qerr, vals, fields) {
        if (callback != null) callback(qerr, vals, fields);
    });
}
exports.change_room_data = function(hotel_id, type, room_date, callback) {
    var sql = "update HotelInfo set Available = Available - 1 where ";
    if (hotel_id != null) sql = sql + " Hotel_ID= " + hotelname + " ";
    if (type != null) sql = sql + " Type= " + type + " ";
    if (room_date != null) sql = sql + " Room_date=" + room_date + " ";
    if (sql == "update HotelInfo set Available = Available - 1 where ") {
        sql = "update HotelInfo set Available = Available - 1;";
    } else sql = sql + ";";
    searchManager.query(sql, function(qerr, vals, fields) {
        if (callback != null) callback(qerr, vals, fields);
    });
}
exports.change_airticket_data = function(departure, airport, destination, depart_time, arrive_time, callback) {
    var sql = "update TicketsInfo set Available = Available - 1 where";
    if (departure != null) sql = sql + " Departure= " + departure + " ";
    if (airport != null) sql = sql + " Airport= " + airport + " ";
    if (destination != null) sql = sql + " Destination=" + destination + " ";
    if (depart_time != null) sql = sql + " Depart_time= " + depart_time + " ";
    if (arrive_time != null) sql = sql + " Arrive_time= " + arrive_time + " ";
    if (sql == "update TicketsInfo set Available = Available - 1 where") {
        sql = "update TicketsInfo set Available = Available - 1;";
    } else sql = sql + ";";
    searchManager.query(sql, function(qerr, vals, fields) {
        if (callback != null) callback(qerr, vals, fields);
    });
}

exports.changedata_room = function(hotalname, province, city, date_in, date_out, callback) {
    var sql = "delete from HotelInfo where ";
    if (hotalname != null)
        sql = sql + " Hotel_Name= " + hotalname + " ";
    if (province != null)
        sql = sql + " Province= " + province + " ";
    if (city != null)
        sql = sql + " City=" + city + " ";
    if (date_in != null) //
        sql = sql + " ";
    if (date_out != null) //
        sql = sql + " ";
    if (sql == "delete from HotelInfo where ") {
        sql = "delete from HotelInfo;";
    } else
        sql = sql + ";";

    searchManager.query(sql, function(qerr, vals, fields) {
        for (var index in vals) {
            var tuple = vals[index];
            var result = '';
            for (var attribute in tuple) {
                result += tuple[attribute];
            }
            //console.log(result+ " llll");
        }
        if (callback != null)
            callback(result);
    });
}


exports.changedata_airticket = function(departure, airport, destination, depart_time, arrive_time, callback) {
    var sql = "delete from TicketsInfo where ";

    if (departure != null)
        sql = sql + " Departure= " + departure + " ";
    if (airport != null)
        sql = sql + " Airport= " + airport + " ";
    if (destination != null)
        sql = sql + " Destination=" + destination + " ";

    if (depart_time != null)
        sql = sql + " Depart_time= " + depart_time + " ";
    if (arrive_time != null)
        sql = sql + " Arrive_time= " + arrive_time + " ";
    if (sql == "delete from TicketsInfo where ") {
        sql = "delete from TicketsInfo;";
    } else
        sql = sql + ";";
    searchManager.query(sql, function(qerr, vals, fields) {
        for (var index in vals) {
            var tuple = vals[index];
            var result = '';
            for (var attribute in tuple) {
                result += tuple[attribute];
            }
            //console.log(result+ " llll");
        }
        if (callback != null)
            callback(result);
    });
}
