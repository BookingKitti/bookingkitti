var http = require('http');
var url = require('url');

var strUrl = "http://121.42.175.1/a2/api/insertorder";
var parse = url.parse(strUrl);
var test = {'buyer':0,'seller':1,'orderAmount':233,'orderItems':'[{"id":"H9","price":233}]','orderStatus':2,'orderTime':'2016-05-31 00:00:00'};

// 待发送的数据
var postStr = JSON.stringify(test)
console.log(postStr);
var options = {
    "method": "POST",
    "host": parse.hostname,
    "path": parse.path,
    "port": parse.port,
    "headers": {
        "Content-Length": postStr.length
    }
};

var req = http.request(options, function(res) {
    res.setEncoding("utf-8");
    var resData = [];
    res.on("data", function(chunk) {
        resData.push(chunk);
    }).on("end", function() {
        console.log(resData.join(""));
    });
});

req.write(postStr);
req.end();
console.log("Finished");
