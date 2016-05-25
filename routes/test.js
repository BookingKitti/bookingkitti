//var comments=require('./comment');

//comments.insert("1","1","1","fuck!!!");
function addDate(date, days){
    var d=new Date(date);
    d.setDate(d.getDate()+days);
    var month=d.getMonth()+1;
    var day = d.getDate();
    if(month<10){
        month = "0"+month;
    }
    if(day<10){
        day = "0"+day;
    }
    var val = d.getFullYear()+"-"+month+"-"+day;
    return val;
}


var sql = "(" + 1 + ", '" + "Type" + "', '" + "date" + "', " + 100 + ", " + 200 + ")";
console.log(sql);

//var myDate = new Date('2016-06-05');
//myDate = myDate + 1;
//console.log(myDate.toLocaleDateString());
