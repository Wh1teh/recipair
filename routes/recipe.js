const express = require('express');
const router = express.Router();
const recipe = require('../models/recipe_model');

router.get('/', function (req, res) {  
    recipe.getById(req.query.id, function (err, dbResult)  {
        if (err) {
            res.json(err);
        }
        else {
            res.json(dbResult);
        }
    })
});


module.exports = router;