//searchManager.js
var mysql = require("mysql");
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
<<<<<<< HEAD
    password: '', //'lucas95123',
    database: 'kitty',
=======
    password: 'lucas95123', //'lucas95123',
    database: 'kitty',

>>>>>>> c0ab79899fb568caffee47810329e28fc1bae8d7
});

exports.query = function(sql, callback, req, res) {
    pool.getConnection(function(err, conn) {
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
