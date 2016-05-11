var searchManager = require('./searchManager');

var sort_order = [" desc", " asc"];

exports.search_hotel_info = function(hotel_name, province, city, addr, date_in, date_out, l_price, h_price, sort_attr, hotel_asc_flag, callback) {
    var sql = "select * from HotelInfo where ";

    var cond_list = [];

    if (hotel_name != null) {
        var res = " Hotel_Name like '%";// + hotel_name + "' ";
        for (var i = 0; i < hotel_name.length; i++) {
            res += hotel_name[i] + "%";
        }
        res += "' ";
        cond_list[cond_list.length] = res;
    }
    if (province != null)
        cond_list[cond_list.length] = " Province= '" + province + "' ";
    if (city != null) {
        cond_list[cond_list.length] = " City='" + city + "' ";
    }
    //address filter supports vague search
    if (addr != null) {
        var res = " Address like '%";
        for (var i = 0; i < addr.length; i++) {
            res += addr[i] + "%";
        }
        res += "' ";
        cond_list[cond_list.length] = res;
    }
    if (date_in != null && date_out != null) {
        cond_list[cond_list.length] = " Hotel_ID in (select Hotel_ID from RoomInfo where Room_date between '" + date_in + "' and '"+ date_out + "') ";
    }

    if (l_price != null)
        cond_list[cond_list.length] = " Hotel_ID in (select Hotel_ID from RoomInfo where Price >= " + l_price + ") ";
    if (h_price != null)
        cond_list[cond_list.length] = " Hotel_ID in (select Hotel_ID from RoomInfo where Price <= " + h_price + ") ";

    //if user did not input any filter condition, just delete "where" in sql sentence
    if (cond_list.length == 0)
        sql = "select * from HotelInfo ";
    else
        sql = sql + cond_list[0];

    for (var i = 1; i < cond_list.length; i++) {
        sql += " and " + cond_list[i];
    }
    //if user choose the sorting option
    if (sort_attr != null) {
        sql = sql + "order by " + sort_attr + sort_order[hotel_asc_flag];
        //change the order flag
        hotel_asc_flag = 1 - hotel_asc_flag;
    }
    sql = sql + ";";

    searchManager.query(sql, function(qerr, vals, fields) {
        if (callback != null)
            callback(qerr, vals, fields);
    });
}
/*
create table HotelInfo(
  Hotel_ID int primary key auto_increment,
  Hotel_Name varchar(20) not null,
  Province varchar(20) not null,
  City varchar(20) not null,
  Address varchar(20) not null,
  Stars int not null,
  Description text not null,
  PhoneNumber varchar(20) not null
) DEFAULT CHARSET=utf8;

create table RoomType(
 Hotel_ID int,
 Type char(10),
 Details text not null,
 Total int not null,
 primary key (Hotel_ID, Type),
 foreign key(Hotel_ID) references HotelInfo(Hotel_ID)
) DEFAULT CHARSET=utf8;
*/
exports.search_hotel_details = function(, callback) {

}

exports.search_airticket_info = function(departure, airport, destination, depart_time, arrive_time, l_price, h_price, sort_attr, air_asc_flag, callback) {
    var sql = "select * from TicketsInfo where ";

    var cond_list = [];

    if (departure != null)
        cond_list[cond_list.length] = " Departure= '" + departure + "' ";
    if (airport != null)
        cond_list[cond_list.length] = " Airport= '" + airport + "' ";
    if (destination != null) {
        cond_list[cond_list.length] = " Destination='" + destination + "' ";
    }
    if (depart_time != null) {
        cond_list[cond_list.length] = " Depart_time='" + depart_time + "' ";
    }
    if (arrive_time != null) {
        cond_list[cond_list.length] = " Arrive_time='" + arrive_time + "' ";
    }

    if (l_price != null)
        cond_list[cond_list.length] = " Price >= " + l_price + ") ";
    if (h_price != null)
        cond_list[cond_list.length] = " Price <= " + h_price + ") ";

    //if user did not input any filter condition, just delete "where" in sql sentence
    if (cond_list.length == 0)
        sql = "select * from TicketsInfo ";
    else
        sql = sql + cond_list[0];

    for (var i = 1; i < cond_list.length; i++) {
        sql += " and " + cond_list[i];
    }
    //if user choose the sorting option
    if (sort_attr != null) {
        sql = sql + "order by " + sort_attr + sort_order[hotel_asc_flag];
        //change the order flag
        hotel_asc_flag = 1 - hotel_asc_flag;
    }
    sql = sql + ";";

    searchManager.query(sql, function(qerr, vals, fields) {
        if (callback != null)
            callback(qerr, vals, fields);
    });
}
