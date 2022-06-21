var mysql = require('mysql2');

var con = mysql.createConnection({
    host: "db",
    user: "root",
    password: "password",
    database: "mainecoon"
});

module.exports = {

    connect: function () {
        con.connect(function (err) {
            if (err) throw err;
            console.log("Connected!");
        })
    },

    createDatabase: function () {
        con.query("CREATE DATABASE mainecoon", function (err, result) {
            if (err) throw err;
            console.log("Database created");
        });
    },

    createTable: function () {
        var sql = "CREATE TABLE mainecoondonation (id INT AUTO_INCREMENT PRIMARY KEY, descri VARCHAR(255), region VARCHAR(255), img VARCHAR(255), phone VARCHAR(14), email VARCHAR(255), dateposted DATE)";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table created");
        });
    },

    insertInto: function (values) {
        var sql = "INSERT INTO mainecoondonation (descri, region, img, phone, email, dateposted) VALUES " + values;
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
    },

    customRequest: function (query) {
        var sql = query;
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result);
            return result;
        });
    },

    select: async function () {
        const results = await con.promise().query("SELECT * FROM mainecoondonation");
        return results[0];
    }

};


