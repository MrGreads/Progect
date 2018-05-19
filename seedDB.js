var MongoClient = require('mongodb').MongoClient;
var data = require("./data.js").data;
var url = "mongodb://localhost:27017/Helsing";
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var mydb= db.db("Helsing")
    mydb.dropDatabase()
    var collection = mydb.collection("hero")
    collection.insertMany(data,function(){
        console.log("Collection creation")
        db.close()
    })
});