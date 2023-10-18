const express = require('express');
const router = express.Router();
const page = require('../models/page_model');

router.get('/', function(request, response) {
    page.getIndex()
        .then(dbResult => {
            response.json(dbResult);
        })
        .catch(err => {
            response.json(err);
        });
});


module.exports=router;