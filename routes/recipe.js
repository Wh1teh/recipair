const express = require('express');
const router = express.Router();
const recipe = require('../models/recipe_model');

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
const path = __dirname + '/../public/html/pages/recipe/';

router.get('/:id', (req, res) => {
    console.log(req)
    recipe.getById(req.params.id, function (err, dbResult) {
        if (err) {
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            const recipe = dbResult[0];
            console.log("AAAAAAA", recipe)
            const htmlSection = `
  <section>
    <h1>${recipe.title}</h1>
    <p>${recipe.content}</p>
    <p>Written by: ${recipe.writer_id}</p>
  </section>
`;

            res.end(buildHTML.combineHTMLcustom(
                [buildHTML.getHead(), buildHTML.getNav(), /*buildHTML.getHeader(),*/
                htmlSection, buildHTML.getFooter()]
            ));
        }
    })
});


module.exports = router;