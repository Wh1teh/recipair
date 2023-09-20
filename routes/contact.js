const express = require('express');
const router = express.Router();
const contact = require('../models/contact_model');

const buildHTML = require('../joinHTML.js');
const path = __dirname + '/../public/html/pages/contact/';

router.get('/', (req, res) => {
    const articles = [path + 'contact.html'];
    res.end(buildHTML.combineHTML(articles));
});

module.exports = router;