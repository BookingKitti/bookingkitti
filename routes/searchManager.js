//searchManager.js
var mysql = require("mysql");
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'c97a38112fe3444a',
    database: 'paykitty'
});

exports.query = function(sql, callback) {
    pool.getConnection(function(err, conn) {
      console.log(sql);
        if (err) {
            callback(err, null, null);
        } else {
            conn.query(sql, function(qerr, vals, fields) {
                //release connection
                conn.release();
                //Event driven callback
                if (callback != null)
                    callback(qerr, vals, fields);
            });
        }
    });
};
