var express = require('express');
var router = express.Router();

const buildHTML = require('../joinHTML.js');
const path = __dirname + '/../public/html/pages/index/';

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', (req, res) => {
  console.log("AA");
  const articles = [path + 'index.html'];
  res.end(buildHTML.combineHTML(articles));
});

module.exports = router;
