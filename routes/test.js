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

var start = '2016-06-05';
var end = '2016-06-08';
var date = new Date(start);
for (var i = start; i <= end; i = addDate(i, 1)) {
    console.log(i);
}
//var myDate = new Date('2016-06-05');
//myDate = myDate + 1;
//console.log(myDate.toLocaleDateString());
