var express = require('express');
var router = express.Router();
var mysql = require('../public/javascripts/mysql')
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

router.post('/insert',(req, res) => {
  console.log("req body: ",req.body);
  if(!req.body.values)
    res.send('Bad input !');
  var values = req.body.values;
  mysql.insertInto(values);
  res.send('Values: ' + values + ' inserted into TABLE mainecoondonation !');
});

router.post('/customRequest',(req, res) => {
  console.log("req body: ",req.body);
  if(!req.body.query)
    res.send('Bad input !');
  var query = req.body.query;
  var result = mysql.customRequest(query);
  res.send('Query: ' + query + ' has been executed with the following result: ', result);
});
  

module.exports = router;
