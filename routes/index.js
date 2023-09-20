var express = require('express');
var router = express.Router();

const buildHTML = require('../joinHTML.js');
const path = __dirname + '/../public/html/pages/index/';

router.get('/', (req, res) => {
  const articles = [path + 'index.html'];
  res.end(buildHTML.combineHTMLcustom(
    [buildHTML.getHead(), buildHTML.getNav(), buildHTML.getHeader(),
    buildHTML.getSections(articles), buildHTML.getFooter()]
  ));
});

module.exports = router;
