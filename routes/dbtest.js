var filter=require('./filterManager');
var book=require('./bookingManager');
var result_result=function(qerr, vals, fields){
  //result=result;
  for(var index in vals){
     var tuple=vals[index];
     var result='';
     for(var attribute in tuple){
       result+=tuple[attribute];
     }
     console.log(result);
   }
}

filter.search_airticket_info(null,null,null,null,null,null,null,"Price",result_result);
filter.search_airticket_info(null,null,null,null,null,null,null,"Price",result_result);
book.change_room_data(1, "HIGH_ROOM", "2016/5/20", result_result);
