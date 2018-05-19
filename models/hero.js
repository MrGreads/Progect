var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var hero = require('../models/hero.js').hero;
var async = require('async');
var heroSchema = mongoose.Schema({
    title: String,
    nick: {
        type: String,
        unique: true,
        required: true
    },
    picture: String,
    about: String,
    created:{
        type:Date,
        default: Date.now
    }
});
exports.hero = mongoose.model('hero', heroSchema);