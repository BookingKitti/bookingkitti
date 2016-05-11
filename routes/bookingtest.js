var book=require('./bookingManager');
var result_result=function(qerr, vals, fields){
  //result=result;
  if(qerr) {
    console.log("error");
    return;
  }
  for(var index in vals){
     var tuple=vals[index];
     var result='';
     for(var attribute in tuple){
       result+=tuple[attribute];
     }
     console.log(result);
   }
}

//book.change_room_data(1, "HIGH_ROOM", "2016/5/20", result_result);
book.create_order_hotel(1, "HIGH_ROOM", "2016/5/20", result_result);
