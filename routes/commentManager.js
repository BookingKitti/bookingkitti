var searchManager=require('./searchManager');

var result2log=function(qerr,vals,fields){
  for(var index in vals){
    var tuple=vals[index];
    var result='';
    for(var attribute in tuple){
      result+=tuple[attribute];
    }
    console.log(result);
  }
};

exports.add_hotel_comment=function(Hotel_ID,Scores,Account_ID,Comments, callback){
  searchManager.query("insert into HotelComments values("+Hotel_ID+","+Scores+","+
  Account_ID+","+"'"+Comments+"'"+");",callback);
  //searchManager.query("insert into mytable values(1"+","+"'yy'"+",1"+","+"1.2);",result2log);
};

exports.get_hotel_comment=function(Hotel_ID, callback){
  searchManager.query('select Scores , Comments from HotelComments where Hotel_ID='+Hotel_ID+';',function(qerr,vals,fields){
      if(callback!=null)
        callback(qerr,vals,fields);
    });
};
