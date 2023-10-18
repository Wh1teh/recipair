var express = require('express');
var router = express.Router();

const buildHTML = require('../joinHTML.js');
const path = __dirname + '/../public/html/pages/';

router.get('/', (req, res) => {
  const recipeTemplate = [path + 'recipe/recipe.html'];

  res.end(buildHTML.combineHTMLcustom(
    [buildHTML.getHead(), buildHTML.getNav(), buildHTML.getHeader(),
    /*buildHTML.getSections(recipeTemplate),*/ buildHTML.getFooter()]
  ));
});

module.exports = router;
