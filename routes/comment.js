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

exports.insert=function(Hotel_ID,Scores,Account_ID,Comments){
  searchManager.query("insert into HotelComments values("+Hotel_ID+","+Scores+","+
  Account_ID+","+"'"+Comments+"'"+");",result2log);
  //searchManager.query("insert into mytable values(1"+","+"'yy'"+",1"+","+"1.2);",result2log);
};

exports.select=function(Hotel_ID){
  searchManager.query('select Scores and Comments from HotelComments',result2log);
};
