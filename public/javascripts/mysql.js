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
        var sql = "CREATE TABLE mainecoondonation (id INT AUTO_INCREMENT PRIMARY KEY, catname VARCHAR(255), descri VARCHAR(255), region VARCHAR(255), img VARCHAR(255), phone VARCHAR(14), email VARCHAR(255), dateposted DATE)";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table created");
        });
    },

    insertInto: async function (values) {
        var sql = "INSERT INTO mainecoondonation (img, catname, descri, region, email, phone, dateposted) VALUES " + values;
        return await con.promise().query(sql);
    },

    customRequest: async function (query) {
        var sql = query;
        return  await con.promise().query(sql);
    },

    select: async function () {
        const results = await con.promise().query("SELECT * FROM mainecoondonation");
        if (!results.length)
            throw new Errors.NotFound('mainecoondonation not found');
        return results[0];
    }

};


