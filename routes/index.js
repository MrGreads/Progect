var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var data = require("../data.js").data;
var url = "mongodb://localhost:27017/Helsing";
var menu=[];
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var ourdb = db.db("Helsing")
    var collection = ourdb.collection("Hero")
    collection.find({}).project({ _id: 0,
        title: 1, nick:
            1 }).toArray(function(err,result){
        if(err) throw err
        menu = result
        console.log(menu)
        db.close()
    })
});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get("/Hero/:nick",function(req,res,next){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var ourdb = db.db("Helsing")
        var collection = ourdb.collection("Heros")
        collection.findOne({nick:req.params.nick},function(err,result){
            if (err) throw err;
            hero = result
            console.log(hero)
            db.close();
    res.render('hero',{
        title: hero.title,
        picture: hero.picture,
        about: hero.desc,
        menu:menu
    })
        })
    });
})
module.exports = router;
