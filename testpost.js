var http = require('http');
var url = require('url');

strUrl = "http://120.27.45.210/";
var parse = url.parse(strUrl);

// 待发送的数据
var postStr = "data=hello";
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
