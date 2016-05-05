var searchManager=require('./searchManager');
var result2log=function(qerr,vals,fields){
  for(var index in vals){
    var tuple=vals[index];
    var result='';
    for(var attribute in tuple){
      result+=tuple[attribute]+' ';
    }
    console.log(result);
  }
};

//searchManager.query('select * from mytable where name =\'john\'', result2log);
searchManager.query('select * from mytable', result2log);
