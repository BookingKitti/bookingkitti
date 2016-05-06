var searchManager=require('./searchManager');

var flag=0;
/*exports.getflag=function()
{
  //var name="qlgjfqwejf";
  return flag;
}*/

exports.serch_hotel_info=function(hotalname,province,city,addr,date_in,date_out,l_price,h_price,sort_attr,callback)
{
  var sql="select * from HotelInfo where ";
  if(hotalname!=null)
    sql=sql+ " Hotel_Name= " +hotalname+" ";
  if(province!=null)
    sql=sql+ " Province= " +province+ " ";
  if(city!=null)
    sql=sql+ " City=" +city+ " ";
  if(addr!=null)
    sql=sql+ " ";///////////////////////////////////////// need change
  if(date_in!=null)
    sql=sql+ " ";
  if(date_out!=null)
    sql=sql+ " ";
  if(l_price!=null)
    sql=sql+ " ";
  if(h_price!=null)
    sql=sql+ " ";

  if(sql=="select * from HotelInfo where ")
  {
    if(sort_attr==null)
      sql="select * from HotelInfo;"
    else
    {
      sql="select * from HotelInfo order by "+sort_attr;
      if(flag==1)
      {
        sql=sql+" asc;";
        flag=0;
      }
      else
      {
        sql=sql+" desc;";
        flag=1;
      }
    }
  }
  else
  {
    if(sort_attr==null)
      sql=sql+";";
    else
    {
        sql=sql+" order by "+sort_attr;
        if(flag==1)
        {
          sql=sql+" asc;";
          flag=0;
        }
        else
        {
          sql=sql+" desc;";
          flag=1;
        }
      }
  }
  searchManager.query(sql,function(qerr,vals,fields){
    for(var index in vals){
      var tuple=vals[index];
      var result='';
      for(var attribute in tuple){
        result+=tuple[attribute];
      }
      //console.log(result+ " llll");
    }
      if(callback!=null)
        callback(result);
    });
}
