const express = require('express');
const router = express.Router();
const test = require('../models/test_model.js');

router.get('/', function (request, response) {
    response.json({ msg: "heloust!" });
});

module.exports = router;