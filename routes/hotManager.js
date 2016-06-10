var searchManager = require('./searchManager');

exports.select_discounted_hotel = function(callback) {
  var sql = "select HotelInfo.Hotel_ID,Hotel_Name,Province,\
  City,Address,Stars,PhoneNumber,Discount,Score,Heat,max(File_Pos) as A_File_Pos, min(Price) as min_price\
  from HotelPics,HotelInfo,RoomInfo where HotelInfo.Hotel_ID=HotelPics.Hotel_ID\
  and Discount < 1.0 group by HotelInfo.Hotel_ID;";
    searchManager.query(sql, function(qerr, vals, fields) {

      console.log(sql);
      console.log(vals);
        if (callback != null)
            callback(qerr, vals, fields);
    });
}

exports.select_hot_hotel = function(callback) {
    var sql = "select HotelInfo.Hotel_ID,Hotel_Name,Province,\
    City,Address,Stars,PhoneNumber,Discount,Score,Heat,max(File_Pos) as A_File_Pos min(Price) as min_price\
    from HotelPics,HotelInfo,RoomInfo where HotelInfo.Hotel_ID=HotelPics.Hotel_ID\
    and Score > 0.0 group by HotelInfo.Hotel_ID;";
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
