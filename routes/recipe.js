const express = require('express');
const router = express.Router();
const recipe = require('../models/recipe_model');

const fs = require('fs');
const cheerio = require('cheerio');

router.get('/', function (req, res) {
    if (req.query.id) {
        recipe.getById(req.query.id, function (err, dbResult) {
            if (err) {
                res.status(500).json({ error: 'Internal Server Error' });
            }
            else {
                res.json(dbResult);
            }
        })
    }
    else if (req.query.param) {
        recipe.getByParameters(req.query.param, function (err, dbResult) {
            if (err) {
                res.status(500).json({ error: 'Internal Server Error' });
            }
            else {
                res.json(dbResult);
            }
        })
    } else {
        recipe.getAll(function (err, dbResult) {
            if (err) {
                res.status(500).json({ error: 'Internal Server Error' });
            }
            else {
                res.json(dbResult);
            }
        })
    }
});

const buildHTML = require('../joinHTML.js');
const path = __dirname + '/../public/html/pages/';

router.get('/:id', (req, res) => {
    recipe.getById(req.params.id, async function (err, dbResult) {
        if (err) {
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            const recipe = dbResult[0];

            var recipeHtml = fs.readFileSync(path + 'recipe/recipe.html', 'utf8');
            const $ = cheerio.load(recipeHtml);

            const ingredients = JSON.parse("[" + recipe.ingredients + "]");

            //create table
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

            res.end(buildHTML.combineHTMLcustom(
                [buildHTML.getHead(), buildHTML.getNav(), buildHTML.getHeader("mini"),
                    modifiedHtml, buildHTML.getFooter()]
            ));
        }
    })
});

async function buildTable(html, ingredients) {
    const $ = cheerio.load(html);

    //put ingredients
    const htmlIngredients = $(".recipe-ingredients");

    //clear existing contents
    htmlIngredients.empty()

    //loop through each ingredient and add it to html
    $(htmlIngredients).append("<table>");
    ingredients.forEach((ingredient) => {
        const listItem = $(`
                <tr>
                <td>${ingredient.name}</td>
                <td>${ingredient.amount}</td>
                <td>${ingredient.unit ? ingredient.unit : ''}</td>
                </tr>
                `).text(ingredient);
        $(htmlIngredients).append(listItem);
    });
    $(htmlIngredients).append("</table>");

    // Convert the modified HTML back to a string
    const modifiedHtml = $.html();
}


module.exports = router;