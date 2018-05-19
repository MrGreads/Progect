var express = require('express');
var router = express.Router();
var hero = require('../models/hero.js').hero;
var async = require('async');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/Helsing";
var menu=[];
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var ourdb = db.db("Helsing")
    var collection = ourdb.collection("hero")
    collection.find({}).project({ _id: 0,
        title: 1, nick: 1 })
        .toArray(function(err,result){
        if(err) throw err
        menu = result
        db.close()
    })
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',menu:menu });
});
router.get('/:nick', function(req, res, next) {
    async.parallel([
            function(callback){
                hero.find({},function(err, heroes){
                    callback(err,heroes);
                });
            },
            function(callback){
                hero.findOne({nick: req.params.nick}, function(err, hero){
                    callback(err, hero);
                });
            }
        ],
        function(err,result){
            if(err) next(err);
            res.render('hero',{ title:result[1].title,
            picture:result[1].picture,
            about:result[1].about,
            menu:menu});
        });
});
module.exports = router;
