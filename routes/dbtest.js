//var filter=require('./filterManager');

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

var str = "%";
var con = "str";
for (var i = 0; i < con.length; i++) {
    str += con[i] + "%";
}
console.log(con.length);

//exports.search_airticket_info = function(departure, airport, destination, depart_time, arrive_time, l_price, h_price, sort_attr, 1, callback)
//filter.search_airticket_info(null,null,null,null,null,null,null,"Price",result2log);
//filter.search_airticket_info(null,null,null,null,null,null,null,"Price",result2log);
