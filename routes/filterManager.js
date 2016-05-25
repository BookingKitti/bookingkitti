
var searchManager = require('./searchManager');

var sort_order = [" desc", " asc"];

//record the search history
var sql_history = [];


//callback的参数表最后加一项: 搜索请求ID
exports.search_hotel_info = function(hotel_name, province, city, addr, date_in, date_out, l_price, h_price, callback) {

    //allocate a search id
    var search_id = sql_history.length;

    var sql = "select * from HotelInfo natural join (select Hotel_ID, min(Price) \
    as Min_Price from RoomInfo group by Hotel_ID) as T natural join (select Hotel_ID, \
      File_Pos from HotelPics where File_Pos like '%small/150x150_0.%') as G ";

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
    if (cond_list.length != 0)
        sql = sql + " where " + cond_list[0];

    for (var i = 1; i < cond_list.length; i++) {
        sql += " and " + cond_list[i];
    }

    //sql = sql + ";";

    sql_history[search_id] = sql;

    searchManager.query(sql, function(qerr, vals, fields) {

        //callback的参数表最后加一项: 搜索请求ID
        if (callback != null)
            callback(qerr, vals, fields, search_id);
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

    var search_id = sql_history.length;

    var sql = "select * from TicketsInfo ";

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
    if (cond_list.length != 0)
        sql = sql + " where " + cond_list[0];

    for (var i = 1; i < cond_list.length; i++) {
        sql += " and " + cond_list[i];
    }

    sql_history[search_id] = sql;

    searchManager.query(sql, function(qerr, vals, fields) {
        if (callback != null)
            callback(qerr, vals, fields, search_id);
    });
}

//req_id: 对哪个搜索请求进行排序   sort_attr: 排序属性名   asc_flag: 1-升序 0-降序
exports.sort_airticket = function(req_id, sort_attr, asc_flag, callback) {

    var sql = sql_history[req_id] + " order by " + sort_attr + sort_order[asc_flag];


//console.log("FUCK"+sql);

    searchManager.query(sql, function(qerr, vals, fields) {
        if (callback != null)
            callback(qerr, vals, fields);
    });
}

exports.search_admin_hotel_info=function(hotel_name, province, city, addr, date_in, date_out, l_price, h_price, callback) {

  var sql = "select Hotel_ID, Hotel_Name, Province, City, Address, Stars, Description, PhoneNumber, Discount, Score, Heat, Min_Price, File_Pos \
	from (select * from HotelInfo left join (select Hotel_ID as TID, \
	min(Price) as Min_Price from RoomInfo group by Hotel_ID) as T on HotelInfo.Hotel_ID = T.TID) as TA \
    left join (select Hotel_ID as GID, \
      File_Pos from HotelPics where File_Pos like '%small/150x150_0.%') as G on TA.Hotel_ID = G.GID ";

    console.log(sql);
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
  if (cond_list.length != 0)
      sql = sql + " where " + cond_list[0];

  for (var i = 1; i < cond_list.length; i++) {
      sql += " and " + cond_list[i];
  }

  //sql = sql + ";";

  //sql_history[sql_history.length] = sql;

console.log(sql);
  searchManager.query(sql, function(qerr, vals, fields) {

      //callback的参数表最后加一项: 搜索请求ID
      if (callback != null)
          callback(qerr, vals, fields);
  });
}
