<<<<<<< HEAD
var filter=require('./filterManager');
=======

//var filter=require('./filterManager');
>>>>>>> c7b55a150e8172f14bd082613552bbad3d48e1a5

var result2log=function(qerr,vals,fields){
  for(var index in vals){
    var tuple=vals[index];
    var result='';
    for(var attribute in tuple){
      result+=(tuple[attribute] + " ");
    }
    console.log(result);
  }
};

<<<<<<< HEAD

//hotel_name, province, city, addr, date_in, date_out, l_price, h_price, sort_attr, hotel_asc_flag, callback)
//exports.search_airticket_info = function(departure, airport, destination, depart_time, arrive_time, l_price, h_price, sort_attr, 1, callback)
filter.search_hotel_info('杭州法云安缦酒店', '浙江', '杭州', '西湖', '2016/05/09', '2016/05/10', 4835.0, 7000.0, null, null, result2log);
//filter.search_airticket_info(null,null,null,null,null,null,null,"Price",result2log);
=======
var str = "%";
var con = "str";
for (var i = 0; i < con.length; i++) {
    str += con[i] + "%";

}
console.log(con.length);

filter.search_airticket_info(null,null,null,null,null,null,null,"Price",result_result);
filter.search_airticket_info(null,null,null,null,null,null,null,"Price",result_result);
book.change_room_data(1, "HIGH_ROOM", "2016/5/20", result_result);
>>>>>>> c7b55a150e8172f14bd082613552bbad3d48e1a5
