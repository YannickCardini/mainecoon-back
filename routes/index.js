var express = require('express');
var router = express.Router();
var mysql = require('../public/javascripts/mysql');
var utils = require('../public/javascripts/utils');
const multer = require('multer'); // file storing middleware
const bodyParser = require('body-parser'); //cleans our req.body;
router.use(bodyParser.urlencoded({ extended: false })); //handle body requests
router.use(bodyParser.json()); // let's make JSON work too!
const path = require('path');

const multerConfig = {

  storage: multer.diskStorage({
    //Setup where the user's file will go
    destination: function (req, file, next) {
      next(null, './public/images');
    },

    //Then give the file a unique name
    filename: function (req, file, next) {
      console.log(file);
      const ext = file.mimetype.split('/')[1];
      next(null, file.fieldname + '-' + Date.now() + '.' + ext);
    }
  }),

  //A means of ensuring only images are uploaded. 
  fileFilter: function (req, file, next) {
    if (!file) {
      next();
    }
    const image = file.mimetype.startsWith('image/');
    if (image) {
      console.log('photo uploaded');
      next(null, true);
    } else {
      console.log("file not supported");

      //TODO:  A better message response to user on failure.
      return next();
    }
  }
};

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

router.get('/clear', async function (req, res, next) {
  var result = await mysql.clear();
  console.log("result: ", result)
  res.json(result);;
})

router.post('/insert', multer(multerConfig).single('photo'), async (req, res) => {
  try {
    var values = utils.parseInsertReq(req);
    await mysql.insertInto(values);
    console.log('Values: ' + values + ' inserted into TABLE mainecoondonation !');
    res.sendFile(path.join(__dirname + '/render/success.html'));;
  } catch (error) {
    console.log("Error: ", error);
    res.sendFile(path.join(__dirname + '/render/error.html'));;
  }
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
