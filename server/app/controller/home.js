const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


module.exports.controller = function(app){

  router.get("/",function(req,res){

    res.render('home');

  });
   

      app.use(router);

}