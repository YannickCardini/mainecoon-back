var express = require('express');
var router = express.Router();
var mysql = require('../public/javascripts/mysql')
const multer  = require("multer");
const upload = multer({ dest: "uploads/" });

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/createDatabase', function (req, res, next) {
  mysql.createDatabase();
  res.send('Database mainecoon created !');;
})

router.get('/createTable', function (req, res, next) {
  mysql.createTable();
  res.send('Table mainecoondonation created !');
})

router.get('/connect', function (req, res, next) {
  mysql.connect();
  res.send('You are connected to database mainecoon !');;
})

router.get('/select', async function (req, res, next) {
  var result = await mysql.select();
  console.log("result: ", result)
  res.json(result);;
})

router.post('/insert', upload.single("img"), async (req, res) => {

  var descri = null;
  var phone = null;
  var img = null;

  console.log("req.body:",req.body)

  if (!req.body.img)
    img = req.body.img;
  if (!req.body.descri)
    descri = req.body.descri;
  if (!req.body.phone)
    phone = req.body.phone;
  if (!req.body.catname)
    res.send('Bad input !');
  if (!req.body.region)
    res.send('Bad input !');
  if (!req.body.email)
    res.send('Bad input !');
  console.log("phone: ",phone)
  var today = new Date().toISOString().slice(0, 10).replace('T', ' ');
  var values = "('" + req.body.catname + "','" + descri + "','" + req.body.region + "','" + img + "','" + phone + "','" + req.body.email + "','" + today + "')";
  var result = await mysql.insertInto(values);
  console.log(result);
  console.log('Values: ' + values + ' inserted into TABLE mainecoondonation !');
  res.render('success');

});

router.post('/customRequest', async (req, res) => {
  console.log("req body: ", req.body);
  if (!req.body.query)
    res.send('Bad input !');
  var query = req.body.query;
  var result = await mysql.customRequest(query);
  res.status(200).send('Query: ' + query + ' has been executed with the following result: ', result)
});


module.exports = router;
