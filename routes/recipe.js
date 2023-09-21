const express = require('express');
const router = express.Router();
const recipe = require('../models/recipe_model');

router.get('/', function (request, response) {
    recipe.getAll(function (err, dbResult) {
        if (err) {
            response.json(err);
        }
        else {
            response.json(dbResult);
        }
    })
});

router.get('/:id',
    function (request, response) {
        recipe.getById(request.params.id, function (err, dbResult) {
            if (err) {
                response.json(err);
            } else {
                response.json(dbResult[0]);
            }
        })
    });


module.exports = router;