var searchManager = require('./searchManager');
var http = require('http');
var url = require('url');
var qs = require('querystring');

exports.get_hotel_info = function(hotel_id, callback) {
    var sql = "select * from HotelInfo where Hotel_ID= " + hotel_id + " ;";
    searchManager.query(sql, function(qerr, vals, fields) {
        if (callback != null) callback(qerr, vals, fields);
    });
}

exports.get_room_info = function(hotel_id, room_date_from, room_data_to, callback) {

    var sql = "select RoomType.Hotel_ID,RoomType.Type,\
    Details,Total,avg(Price),min(Available)\
    from RoomInfo,RoomType where RoomInfo.Hotel_ID\
    =RoomType.Hotel_ID and RoomInfo.Type=RoomType.Type\
    and Room_date between '" + room_date_from + "' and '" + room_data_to + "' and RoomInfo.Hotel_ID=" + hotel_id + " group by  RoomType.Type;";

    searchManager.query(sql, function(qerr, vals, fields) {
        if (callback != null)

            callback(qerr, vals, fields);
    });
}

exports.get_room_pics = function(hotel_id, callback) {

    var sql = "select Type,File_Pos from RoomTypePics where Hotel_ID= " + hotel_id + " and (File_Pos like '%small/150x150_%' or File_Pos like '%zzefault%');";
    console.log(sql);
    searchManager.query(sql, function(qerr, vals, fields) {
        var map = new Object();
        for (var row in vals) {
            console.log(vals[row].Type);
            console.log(vals[row].File_Pos);
            if (typeof map[vals[row].Type] == "undefined") {
                map[vals[row].Type] = vals[row].File_Pos;
            } else if (map[vals[row].Type] == "avatar/zzefault_room.png" && vals[row].File_Pos != "avatar/zzefault_room.png") {
                map[vals[row].Type] = vals[row].File_Pos;
            }
        }
        console.log("注意我注意我");
        console.log(map);
        if (callback != null) {
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
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    var val = d.getFullYear() + "-" + month + "-" + day + " "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds(); //default for %H %M %S
    return val;
}
//Y-m-d H:M:S

exports.create_order_hotel = function(user_id, hotel_id, type, room_date_from, room_data_to, callback) {
    change_room_data(hotel_id, type, room_date_from, room_data_to, function(qerr, vals, fields) {
        //result=result;
        if (qerr) {
            console.log("error");
            callback(qerr, vals, fields);
            return;
        }

        var select_price_sql = "select sum(price) as sum_price from HotelInfo natural join RoomInfo where Hotel_ID = " + hotel_id + " and Type = '" + type + "' and Room_date >= '" + room_date_from + "' and Room_date <'" + room_data_to + "';";

        searchManager.query(select_price_sql, function(qerr, vals, fields) {
            //console.log(qerr);
            //callback(qerr, vals, fields);
            var sumPrice = vals[0].sum_price;

            var myDate = new Date();
            var insert_sql = "insert into HotelOrderHistory values(" + user_id + ", " + hotel_id + ", '" + toDate(myDate) + "', " + sumPrice + ")";

            searchManager.query(insert_sql, function(qerr, vals) {
                //console.log(qerr);
                //callback(qerr, vals, fields);
                callback(qerr, sumPrice);
            });
        });
    });
}

exports.create_order_ariticket = function(user_id, airticket_id, callback) {

    //先不管吧,两百多张票呢,卖不完
    //change_airticket_data(departure, airport, destination, depart_time, arrive_time, function(qerr, vals, fields) {
    //    //result=result;
    //    if (qerr) {
    //        callback(qerr, vals, fields);
    //    }
    //});
    var sql = "select Price from TicketsInfo where AirTicket_ID=" + airticket_id;

    searchManager.query(sql, function(qerr, vals, fields) {
        callback(qerr, vals[0].Price, fields);
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

exports.send_hotel_order_info = function(User_ID, Hotel_ID, Price, callback) {
    //send post request: include six values
    var qs = require('querystring');
    var order=new Array();
    order[0]={
        "id": "H" + Hotel_ID,
        "price": Price
    }

    //JSON Format:
    var post_data = {
        'buyer': parseInt(User_ID),
        'seller': 0, //default
        'orderAmount': parseInt(Price), //default
        'orderItems': JSON.stringify(order), //-------------------------------need to modify
        'orderStatus': 0, //default
        'orderTime': toDate(new Date()) //format %Y %m %d %H %M %S
    }; //这是需要提交的数据

    console.log("======================");
    console.log(JSON.stringify(post_data));
    var content = JSON.stringify(post_data);

    var options = {
        hostname: '121.42.175.1',
        //hostname: '115.29.112.57',
        path: '/a2/api/insertorder',
        //path: '/book',
        port: 80,
        //port: 3000,
        method: 'POST',
        headers: {
            'Content-Length': content.length,
            'Content-Type': 'application/json'
        }
    };

    var req = http.request(options, function(res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function(chunk) {
            console.log('BODY: ' + chunk);
        });
    });

    req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });

    // write data to request body
    req.write(content);

    req.end();

    if (callback != null) {
        callback();
    }
}

/*
酒店Interface 2: 像M2发送某个酒店的详细信息，包括图片url
In: Hotel_ID -- 酒店ID
*/
exports.send_hotel_detailed_info = function(Hotel_ID, callback) {

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
            Hotel_ID: plist[0], //int primary key auto_increment,
            Hotel_Name: plist[1], //varchar(20) not null,
            Province: plist[2], //varchar(20) not null,
            City: plist[3], //varchar(20) not null,
            Address: plist[4], //varchar(20) not null,
            Stars: plist[5], //int not null,
            Description: plist[6], //text not null,
            PhoneNumber: plist[7], //varchar(20) not null,
            Discount: plist[8], //decimal(3, 2),
            Score: plist[9], //float,
            Heat: plist[10], //int
            Seller_Id: plist[11],
            File_Pos: plist[12]
        }; //这是需要提交的数据

        callback(post_data)
    })
}

/*
机票Interface 1：像M2发送订单详情post
*/
exports.send_airticket_order_info = function(User_ID, AirTicket_ID, Price, callback) {

    //send post request: include six values
    var qs = require('querystring');
    var order=new Array();
    order[0]={
        "id": "T" + AirTicket_ID,
        "price": Price
    }

    //JSON Format:
    var post_data = {
        'buyer': parseInt(User_ID),
        'seller': 0, //default
        'orderAmount': parseInt(Price), //default
        'orderItems': JSON.stringify(order), //-------------------------------need to modify
        'orderStatus': 0, //default
        'orderTime': toDate(new Date()) //format %Y %m %d %H %M %S
    }; //这是需要提交的数据

    console.log("======================");
    console.log(JSON.stringify(post_data));
    var content = JSON.stringify(post_data);

    var options = {
        hostname: '121.42.175.1',
        //hostname: '115.29.112.57',
        path: '/a2/api/insertorder',
        //path: '/book',
        port: 80,
        //port: 3000,
        method: 'POST',
        headers: {
            'Content-Length': content.length,
            'Content-Type': 'application/json'
        }
    };

    var req = http.request(options, function(res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function(chunk) {
            console.log('BODY: ' + chunk);
        });
    });

    req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });

    // write data to request body
    req.write(content);

    req.end();

    if (callback != null) {
        callback();
    }
}


/*
酒店Interface 2: 像M2发送某机票的详细信息
In: AirTicket_ID -- 机票ID
*/
exports.send_airticket_detailed_info = function(AirTicket_ID, callback) {

    var sql = "select * from TicketsInfo where AirTicket_ID = " + AirTicket_ID;

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
            AirTicket_ID: plist[0], //int primary key auto_increment,
            Flight_Company: plist[1], //varchar(20) not null,
            Flight_No: plist[2], //varchar(20) not null,
            Departure: plist[3], //varchar(20) not null,
            Stopover: plist[4], //varchar(20) not null,
            Destination: plist[5], //int not null,
            Depart_time: plist[6], //text not null,
            Stopover_time: plist[7], //varchar(20) not null,
            Arrive_time: plist[8], //decimal(3, 2),
            Total: plist[9], //float,
            Available: plist[10], //int
            Price: plist[11],
            Discount: plist[12]
        }; //这是需要提交的数据
        callback(post_data)
    })
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
