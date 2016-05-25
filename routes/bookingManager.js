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

exports.get_room_pics = function(hotel_id, callback) {

    var sql="select Type,File_Pos from RoomTypePics where Hotel_ID= "+hotel_id +" and (File_Pos like '%small/150x150_%' or File_Pos like '%zzefault%');";
    console.log(sql);
    searchManager.query(sql, function(qerr, vals, fields) {
      var map=new Object();
      for(var row in vals){
        console.log(vals[row].Type);
        console.log(vals[row].File_Pos);
        if(typeof map[vals[row].Type]=="undefined"){
          map[vals[row].Type]=vals[row].File_Pos;
        }
        else if(map[vals[row].Type]=="avatar/zzefault_room.png"&&vals[row].File_Pos!="avatar/zzefault_room.png"){
          map[vals[row].Type]=vals[row].File_Pos;
        }
      }
      console.log("注意我注意我");
      console.log(map);
        if (callback != null)
        {
          callback(qerr, map, fields);
        }
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

//format %Y %m %d %H %M %S
function toDate(date) {
  var d = new Date(date);
  d.setDate(d.getDate());
  var month = d.getMonth() + 1;
  var day = d.getDate();
  if(month < 10){
      month = "0" + month;
  }
  if(day < 10) {
      day = "0" + day;
  }
  var val = "%" + d.getFullYear() + " %" + month + " %" + day + " %00 %00 %00";//default for %H %M %S
  return val;
}

exports.create_order_hotel = function(user_id, hotel_id, type, room_date_from, room_data_to, callback) {
    change_room_data(hotel_id, type, room_date_from, room_data_to, function(qerr, vals, fields) {
        //result=result;
        if (qerr)
        {
            console.log("error");
            callback(qerr, vals, fields);
            return;
        }

        var myDate = new Date();
        var insert_sql = "insert into HotelOrderHistory values(" + user_id + ", " + hotel_id + ", '" + toDate(myDate) + "', " + Room_date + ", " +  Room_date + ")";

        searchManager.query(insert_sql, function(qerr, vals, fields) {
            //console.log(qerr);
            //callback(qerr, vals, fields);
            searchManager.query(sql, function(qerr, vals, fields) {
                //console.log(qerr);
                callback(qerr, vals, fields);
            });
        });
        var sql = "select Departure,Destination,Depart_time,Arrive_time,Price from TicketsInfo where "
        + " Departure=  '" + departure + "' "
        + " and Destination= '" + destination + "' "
        + " and Depart_time= '" + depart_time + "' "
        + " and Arrive_time= '" + arrive_time + "' ;";

        searchManager.query(sql, function(qerr, vals, fields) {
            //console.log(qerr);
            callback(qerr, vals, fields);
        });

    });
}

exports.create_order_ariticket = function(user_id, departure, destination, depart_time, arrive_time, callback) {
    change_airticket_data(departure, airport, destination, depart_time, arrive_time, function(qerr, vals, fields) {
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

//input: Hotel ID
//return: Type(room)
exports.get_room_type = function(Hotel_ID, callback) {

    var sql = "select * from RoomType where Hotel_ID = " + Hotel_ID;

    searchManager.query(sql, function(qerr, vals, fields) {
        //console.log(qerr);
        callback(qerr, vals, fields);
    });
}

//buyer:
//seller
//amount
//item: Hotel_ID
//status:
//finish_time:
exports.send_hotel_order_info = function (User_ID, Hotel_ID, price, res) {

    //send post request: include six values

    var qs = require('querystring');

    //JSON Format:
    var post_data = {
        buyer: User_ID,
        seller: 0, //default
        orderAmount: 1, //default
        orderItems: Hotel_ID, //-------------------------------need to modify
        orderStatus: 0, //default
        time: toDate(new Date()) //format %Y %m %d %H %M %S
    };//这是需要提交的数据


    var content = qs.stringify(post_data);

    var options = {
        hostname: '121.42.175.1',
        port: 10086, //default
        path: '/a2/api/insertorder',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    };

    var req = http.request(options, function (res) {
        //console.log('STATUS: ' + res.statusCode);
        //console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
        });
    });

    req.on('error', function (e) {
        console.log('problem with request: ' + e.message);
    });

    // write data to request body
    req.write(content);

    req.end();
}

exports.send_hotel_detailed_info = function (Hotel_ID) {

    var sql = "select * from HotelInfo natural join HotelPics where Hotel_ID = " + Hotel_ID + " limit 1";

    searchManager.query(sql, function(qerr, vals, fields) {

        var plist = [];

        for (var index in vals) {
            var tuple = vals[index];
            var result = '';
            //var i = 0;
            //plist[] = "";
            for (var attribute in tuple) {
                plist[plist.length] = tuple[attribute];
                //i++;
            }
            //末尾多出##
        }

        var qs = require('querystring');

        var post_data = {
            Hotel_ID:  plist[0],//int primary key auto_increment,
            Hotel_Name: plist[1],//varchar(20) not null,
            Province: plist[2],//varchar(20) not null,
            City: plist[3],//varchar(20) not null,
            Address: plist[4],//varchar(20) not null,
            Stars: plist[5],//int not null,
            Description: plist[6],//text not null,
            PhoneNumber: plist[7],//varchar(20) not null,
            Discount: plist[8],//decimal(3, 2),
            Score: plist[9],//float,
            Heat: plist[10],//int
            File_Pos: plist[11]
        };//这是需要提交的数据


        var content = qs.stringify(post_data);

        var options = {
            hostname: '121.42.175.1',
            port: 10086, //default
            path: '/a2/api/insertorder',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        };

        var req = http.request(options, function (res) {
            //console.log('STATUS: ' + res.statusCode);
            //console.log('HEADERS: ' + JSON.stringify(res.headers));
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                console.log('BODY: ' + chunk);
            });
        });

        req.on('error', function (e) {
            console.log('problem with request: ' + e.message);
        });

        // write data to request body
        req.write(content);

        req.end();
    });

}
