var searchManager = require('./bookingManager');

exports.sendEmail = function (req, res) {

    var data = {
        address: 'test@test.com',
        subject: "test"
    };

    data = JSON.stringify(data);
    console.log(data);
    var opt = {
        method: "POST",
        host: "localhost",
        port: 8080,
        path: "/v1/sendEmail",
        headers: {
            "Content-Type": 'application/json',
            "Content-Length": data.length
        }
    };

    var req = http.request(opt, function (serverFeedback) {
        if (serverFeedback.statusCode == 200) {
            var body = "";
            serverFeedback.on('data', function (data) { body += data; })
                          .on('end', function () { res.send(200, body); });
        }
        else {
            res.send(500, "error");
        }
    });
    req.write(data + "\n");
    req.end();
}

sendEmail();
