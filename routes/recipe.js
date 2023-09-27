const express = require('express');
const router = express.Router();
const recipe = require('../models/recipe_model');

router.get('/', function (req, res) {
    if (req.query.id) {
        recipe.getById(req.query.id, function (err, dbResult) {
            if (err) {
                // res.json(err);
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


module.exports = router;