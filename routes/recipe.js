const express = require('express');
const router = express.Router();
const recipe = require('../models/recipe_model');

const fs = require('fs');
const cheerio = require('cheerio');

router.get('/', function (req, res) {
    if (req.query.param) {
        recipe.getByParameters(req.query.param)
            .then(function (dbResult) {
                res.json(dbResult[0]);
            })
            .catch(function (err) {
                res.status(500).json({ error: 'Internal Server Error' });
            });
    } else {
        recipe.getAll()
            .then(function (dbResult) {
                res.json(dbResult[0]);
            })
            .catch(function (err) {
                res.status(500).json({ error: 'Internal Server Error' });
            });
    }
});

const buildHTML = require('../joinHTML.js');
const path = __dirname + '/../public/html/pages/';

const renderRecipe = (res, recipeContent, ingredients) => {
    const recipeHtml = fs.readFileSync(path + 'recipe/recipe.html', 'utf8');
    const $ = cheerio.load(recipeHtml);

    ingredients = ingredients[0];
    recipeContent = recipeContent[0];

    //add title
    $('.recipe-title').append(recipeContent.title);

    //replace newlines
    recipeContent.content = recipeContent.content.replace(/\n/g, "<br><br>");
    $('.recipe-text').append(recipeContent.content);

    //add ingredients table
    const table = $('<table>').addClass('ingredients-table');
    ingredients.forEach((ingredient) => {
        const row = $('<tr>');

        //print nothing if null
        const name = $('<td>').text(ingredient.name);
        const amount = $('<td>').text(ingredient.amount != null ? ingredient.amount : '');
        const unit = $('<td>').text(ingredient.unit != null ? ingredient.unit : '');

        row.append(name, amount, unit);
        table.append(row);
    });

    // add table to div
    $('.recipe-ingredients').append(table);

    const modifiedHtml = $.html();

    res.end(buildHTML.combineHTMLcustom([
        buildHTML.getHead(),
        buildHTML.getNav(),
        buildHTML.getHeader("mini"),
        modifiedHtml,
        buildHTML.getFooter()
    ]));
};

router.get('/:id', (req, res) => {
    var recipeContent;

    //get random recipe if id is x
    if (req.params.id === "x") {
        //get general info
        recipe.getRandomRecipe()
            .then((dbResult) => {
                recipeContent = dbResult[0];

                //get ingredients
                return recipe.getIngredientsById(recipeContent[0].id);
            })
            .then((ingredients) => {
                //build html and send response
                renderRecipe(res, recipeContent, ingredients);
            })
            .catch((err) => {
                res.status(500).json({ error: 'Internal Server Error' });
            });
    }
    // get by id
    else {
        //get general info
        recipe.getById(req.params.id)
            .then((dbResult) => {
                recipeContent = dbResult[0];

                //get ingredients
                return recipe.getIngredientsById(req.params.id);
            })
            .then((ingredients) => {
                //build html and send response
                renderRecipe(res, recipeContent, ingredients);
            })
            .catch((err) => {
                res.status(500).json({ error: 'Internal Server Error' });
            });
    }
});

module.exports = router;