var searchManager = require('./searchManager');

var flag1 = 0; //hotel_info
var flag2 = 0; //hotel_info


exports.search_hotel_info = function(hotel_name, province, city, addr, date_in, date_out, l_price, h_price, sort_attr, callback) {
    var sql = "select * from HotelInfo where ";
    if (hotel_name != null)
        sql = sql + " Hotel_Name= '" + hotel_name + "' ";
    if (province != null)
        sql = sql + " Province= '" + province + "' ";
    if (city != null)
        sql = sql + " City='" + city + "' ";
    if (addr != null)
        sql = sql + " "; ///////////////////////////////////////// need change
    if (date_in != null)
        sql = sql + " ";
    if (date_out != null)
        sql = sql + " ";
    if (l_price != null)
        sql = sql + " ";
    if (h_price != null)
        sql = sql + " ";

    if (sql == "select * from HotelInfo where ") {
        if (sort_attr == null)
            sql = "select * from HotelInfo;"
        else {
            sql = "select * from HotelInfo order by " + sort_attr;
            if (flag1 == 1) {
                sql = sql + " asc;";
                flag1 = 0;
            } else {
                sql = sql + " desc;";
                flag1 = 1;
            }
        }
    } else {
        if (sort_attr == null)
            sql = sql + ";";
        else {
            sql = sql + " order by " + sort_attr;
            if (flag1 == 1) {
                sql = sql + " asc;";
                flag1 = 0;
            } else {
                sql = sql + " desc;";
                flag1 = 1;
            }
        }
    }
    searchManager.query(sql, function(qerr, vals, fields) {
        if (callback != null)
            callback(qerr, vals, fields);
    });
}


exports.search_airticket_info = function(departure, airport, destination, depart_time, arrive_time, l_rice, h_price, sort_attr, callback) {
    var sql = "select * from TicketsInfo where ";
    if (departure != null)
        sql = sql + " Departure= '" + departure + "' ";
    if (airport != null)
        sql = sql + " Airport= '" + airport + "' ";
    if (destination != null)
        sql = sql + " Destination='" + destination + "' ";

    if (depart_time != null)
        sql = sql + " Depart_time= '" + depart_time + "' ";
    if (arrive_time != null)
        sql = sql + " Arrive_time= '" + arrive_time + "' ";

    if (l_price != null)
        sql = sql + " ";
    if (h_price != null)
        sql = sql + " ";

    if (sql == "select * from TicketsInfo where ") {
        if (sort_attr == null)
            sql = "select * from TicketsInfo;"
        else {
            sql = "select * from TicketsInfo order by " + sort_attr;
            if (flag2 == 1) {
                sql = sql + " asc;";
                flag2 = 0;
            } else {
                sql = sql + " desc;";
                flag2 = 1;
            }
        }
    } else {
        if (sort_attr == null)
            sql = sql + ";";
        else {
            sql = sql + " order by " + sort_attr;
            if (flag2 == 1) {
                sql = sql + " asc;";
                flag2 = 0;
            } else {
                sql = sql + " desc;";
                flag2 = 1;
            }
        }
    }
    searchManager.query(sql, function(qerr, vals, fields) {
        if (callback != null)
            callback(qerr, vals, fields);
    });
}
