
var searchManager = require('./searchManager');

var sort_order = [" desc", " asc"];

//record the search history
var sql_history = [];


//callback的参数表最后加一项: 搜索请求ID
exports.search_hotel_info = function(hotel_name, province, city, addr, date_in, date_out, l_price, h_price, callback) {

    var sql = "select * from HotelInfo natural join (select Hotel_ID, min(Price) \
    as Min_Price from RoomInfo group by Hotel_ID) natural join (select Hotel_ID, \
      min(File_Pos) as A_File_Pos from HotelPics group by Hotel_ID) as G where ";

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
        sql = "select * from HotelInfo natural join (select Hotel_ID, min(Price) as Min_Price from RoomInfo group by Hotel_ID) as S natural join (select Hotel_ID, min(File_Pos) as A_File_Pos from HotelPics group by Hotel_ID) as G ";
    else
        sql = sql + cond_list[0];

    for (var i = 1; i < cond_list.length; i++) {
        sql += " and " + cond_list[i];
    }

    //sql = sql + ";";

    sql_history[sql_history.length] = sql;

console.log(sql);
    searchManager.query(sql, function(qerr, vals, fields) {

        //callback的参数表最后加一项: 搜索请求ID
        if (callback != null)
            callback(qerr, vals, fields, sql_history.length - 1);
    });
}

//req_id: 对哪个搜索请求进行排序   sort_attr: 排序属性名   asc_flag: 1-升序 0-降序
exports.sort_hotel = function(req_id, sort_attr, asc_flag, callback) {

    if (sort_attr == "Price") {
        sort_attr = "Min_Price";
    }
    var sql = sql_history[req_id] + " order by " + sort_attr + sort_order[asc_flag];
    console.log(sql);
    searchManager.query(sql, function(qerr, vals, fields) {
        if (callback != null)
            callback(qerr, vals, fields);
    });
}

exports.search_airticket_info = function(departure, destination, depart_time, l_price, h_price, callback) {
    var sql = "select * from TicketsInfo where ";

    var cond_list = [];

    if (departure != null)
        cond_list[cond_list.length] = " Departure= '" + departure + "' ";

    if (destination != null) {
        cond_list[cond_list.length] = " Destination='" + destination + "' ";
    }
    if (depart_time != null) {
        cond_list[cond_list.length] = " Depart_time='" + depart_time + "' ";
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


    searchManager.query(sql, function(qerr, vals, fields) {
        if (callback != null)
            callback(qerr, vals, fields);
    });
}

//req_id: 对哪个搜索请求进行排序   sort_attr: 排序属性名   asc_flag: 1-升序 0-降序
exports.sort_airticket = function(req_id, sort_attr, asc_flag, callback) {

    var sql = sql_history[req_id] + " order by " + sort_attr + sort_order[asc_flag];

    searchManager.query(sql, function(qerr, vals, fields) {
        if (callback != null)
            callback(qerr, vals, fields);
    });
}
