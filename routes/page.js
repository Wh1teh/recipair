const express = require('express');
const router = express.Router();
const page = require('../models/page_model');

router.get('/',function(request,response){
    page.getIndex(function(err,dbResult){
        if(err){
            response.json(err);
        }
        else{
            response.json(dbResult);
        }
    })
});


module.exports=router;