
var hero = require('../models/hero.js').hero;

module.exports = function(req,res,next){
    res.locals.navigation = [];
    hero.find(null,{_id:0,title:1,nick:1},
        function(err, result){
            if(err) return next(err);
            res.locals.navigation = result;
            next();
        }
    )
};
