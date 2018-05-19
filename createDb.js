var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/learn');
var async = require('async');
var data = require('./data.js').data;
var hero = require('../models/hero.js').hero;
function open(callback){
    mongoose.connection.on('open', callback);
};
function dropDatabase(callback){
    var db = mongoose.connection.db;
    db.dropDatabase(callback);
};
function requireModels(callback){
    require('./models/hero.js');
    async.each
        (Object.keys
                (mongoose.models),
            function(modelName){
                mongoose.models[modelName].ensureIndexes(callback);
            },
            callback);
};
function createHeroes(callback){
    async.each
        (data, function(heroData,callback){
                var hero = new mongoose.models.hero(heroData);
                hero.save(callback)
            },
            callback);
};
async.series([
        open,
        dropDatabase,
        requireModels,
        createHeroes
    ],function(err){
    mongoose.disconnect();
    });