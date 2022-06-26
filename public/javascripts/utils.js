module.exports = {
    parseInsertReq: function (req) {
        var descri = null;
        var phone = null;
        var img = '/opt/images/' + req.file.filename;

        console.log("req.body:", req.body);

        if (req.body.descri)
            descri = req.body.descri;
        if (req.body.phone) {
            phone = req.body.phone;
        }
        if (!req.body.catname)
            throw 'Input catname missing';
        if (!req.body.region)
            throw 'Input region missing';
        if (!req.body.email)
            throw 'Input email missing';

        var today = new Date().toISOString().slice(0, 10).replace('T', ' ');
        return "('" + req.body.catname + "','" + descri + "','" + req.body.region + "','" + img + "','" + phone + "','" + req.body.email + "','" + today + "')";

    }
}



