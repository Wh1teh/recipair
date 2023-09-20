const express = require('express');
const router = express.Router();
const nav = require('../models/nav_model');

router.get('/',function(request,response){
    nav.getAll(function(err,dbResult){
        if(err){
            response.json(err);
        }
        else{
            response.json(dbResult);
        }
    })
});

module.exports=router;