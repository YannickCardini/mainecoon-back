var mysql = require('mysql2');

module.exports = {

    connect: function(){
        var con = mysql.createConnection({
            host: "db",
            user: "root",
            password: "password",
        });
        con.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
            con.query("CREATE DATABASE mainecoon", function (err, result) {
              if (err) throw err;
              console.log("Database created");
            });
          });
    },


    createTable: function () {
        var sql = "CREATE TABLE mainecoondonation (id INT AUTO_INCREMENT PRIMARY KEY, catname VARCHAR(255), descri VARCHAR(255), region VARCHAR(255), img VARCHAR(255), phone VARCHAR(14), email VARCHAR(255), dateposted DATE)";
        mysql.createConnection({
            host: "db",
            user: "root",
            password: "password",
            database: "mainecoon"
        }).query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table created");
        });
    },

    insertInto: async function (values) {
        return new Promise((resolve, reject) => {
            var sql = "INSERT INTO mainecoondonation (catname, descri, region, img, phone, email, dateposted) VALUES " + values;
            return mysql.createConnection({
                host: "db",
                user: "root",
                password: "password",
                database: "mainecoon"
            }).query(sql, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        })
    },

    clear: async function () {
        const results = await mysql.createConnection({
            host: "db",
            user: "root",
            password: "password",
            database: "mainecoon"
        }).promise().query("DELETE FROM mainecoondonation");
        if (!results.length)
            throw new Errors.NotFound('mainecoondonation not found');
        return results[0];
    },

    customRequest: async function (query) {
        var sql = query;
        return await mysql.createConnection({
            host: "db",
            user: "root",
            password: "password",
            database: "mainecoon"
        }).promise().query(sql);
    },

    select: async function () {
        const results = await mysql.createConnection({
            host: "db",
            user: "root",
            password: "password",
            database: "mainecoon"
        }).promise().query("SELECT * FROM mainecoondonation");
        if (!results.length)
            throw new Errors.NotFound('mainecoondonation not found');
        return results[0];
    }

};


