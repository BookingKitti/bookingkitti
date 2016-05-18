var searchManager = require('./searchManager');

exports.get_hotel_info = function(hotel_id, callback) {
    var sql = "select * from HotelInfo where Hotel_ID= " + hotel_id + " ;";
    searchManager.query(sql, function(qerr, vals, fields) {
        if (callback != null) callback(qerr, vals, fields);
    });
}

exports.get_room_info = function(hotel_id, room_date_from, room_data_to, callback) {

    var sql="select RoomType.Hotel_ID,RoomType.Type,\
    Details,Total,avg(Price),min(Available)\
    from RoomInfo,RoomType where RoomInfo.Hotel_ID\
    =RoomType.Hotel_ID and RoomInfo.Type=RoomType.Type\
    and Room_date between '"+room_date_from+"' and '"
    +room_data_to+"' and RoomInfo.Hotel_ID="
    +hotel_id+" group by  RoomType.Type;" ;

    searchManager.query(sql, function(qerr, vals, fields) {
        if (callback != null)

        callback(qerr, vals, fields);
    });
}

//need to change
exports.get_airticket_info = function(airticket_id, callback) {
    var sql = "select * from TicketsInfo where AirTicket_ID= " + airticket_id + " ;";
    searchManager.query(sql, function(qerr, vals, fields) {
        if (callback != null) callback(qerr, vals, fields);
    });
}

var change_room_data = function(hotel_id, type, room_date_from, room_data_to, callback) {
    var sql = "update RoomInfo set Available = Available - 1 where ";
    if (hotel_id != null)
        sql = sql + " Hotel_ID= " + hotel_id + " ";
    if (type != null)
        sql = sql + " and Type=  '" + type + "' ";
    sql = sql + " and Room_date between '" + room_date_from + "' ";
    sql = sql + " and '" + room_data_to + "' ";
    if (sql == "update RoomInfo set Available = Available - 1 where ") {
        sql = "update RoomInfo set Available = Available - 1;";
    } else
        sql = sql + ";";

    searchManager.query(sql, function(qerr, vals, fields) {
        if (callback != null)
          callback(qerr, vals, fields);
    });
}
//delete the airport 5/18
var change_airticket_data = function(departure, destination, depart_time, arrive_time, callback) {
    var sql = "update TicketsInfo set Available = Available - 1 where";
    if (departure != null)
      sql = sql + " Departure=  '" + departure + "' ";
    if (destination != null)
      sql = sql + " and Destination= '" + destination + "' ";
    if (depart_time != null)
      sql = sql + " and Depart_time= '" + depart_time + "' ";
    if (arrive_time != null)
      sql = sql + " and Arrive_time= '" + arrive_time + "' ";
    if (sql == "update TicketsInfo set Available = Available - 1 where") {
        sql = "update TicketsInfo set Available = Available - 1;";
    } else sql = sql + ";";

    searchManager.query(sql, function(qerr, vals, fields) {
        if (callback != null)
          callback(qerr, vals, fields);
    });
}

exports.create_order_hotel = function(hotel_id, type, room_date_from, room_data_to, req, res, callback){
  change_room_data(hotel_id, type, room_date_from, room_data_to, function(qerr, vals, fields){
    //result=result;
    if(qerr)
    {
      console.log("error");
      callback(qerr, vals, fields, req, res);
      return;
    }
    callback(qerr, vals, fields, req, res);
      // var sql1="select Hotel_Name,Province,City,Address,\
      // Stars,Description,PhoneNumber,Type,Room_date,Price\
      //  from HotelInfo,RoomInfo where HotelInfo.Hotel_ID=\
      //  RoomInfo.Hotel_ID and RoomInfo.Hotel_ID="+hotel_id
      //  +" and Type='"+type+"' and Room_date='"+
      //  room_date_from+"' ;"
    //   searchManager.query(sql1, function(qerr1, vals1, fields1) {
    //     //console.log(qerr);
    //     callback(qerr1, vals1, fields1);
    // });
  });
}

exports.create_order_ariticket = function(departure, destination, depart_time, arrive_time, callback){
  change_airticket_data(departure, airport, destination, depart_time, arrive_time, function(qerr, vals, fields){
    //result=result;
    if(qerr)
    {
      callback(qerr, vals, fields);
    }
  });
  //var final_qerr;
  //var final_vals;
  var sql="select Departure,Destination,Depart_time,Arrive_time,Price from TicketsInfo where "
  + " Departure=  '" + departure + "' "
  + " and Destination= '" + destination + "' "
  + " and Depart_time= '" + depart_time + "' "
  + " and Arrive_time= '" + arrive_time + "' ;";
  searchManager.query(sql, function(qerr, vals, fields) {
    //console.log(qerr);
      callback(qerr, vals, fields);
  });
}
