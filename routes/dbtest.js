var filter=require('./adminManager');

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

//hotel_name, province, city, addr, date_in, date_out, l_price, h_price, sort_attr, hotel_asc_flag, callback)
//exports.search_airticket_info = function(departure, airport, destination, depart_time, arrive_time, l_price, h_price, sort_attr, 1, callback)
//filter.search_hotel_info('杭州法云安缦酒店', '浙江', '杭州', '西湖', '2016/05/09', '2016/05/10', 4835.0, 7000.0, null, null, result2log);
//filter.search_airticket_info(null,null,null,null,null,null,null,"Price",result2log);
//filter.update_room_info(1, '村庄别墅', '2016-05-04', '2016-05-16', 100, 6000, result2log);
//exports.update_room_info = function (Hotel_ID, Type, Start_date, End_date, Available, Price, callback)
exports.sendEmail = function (req, res) {
    res.send(200, req.body.address);
}
