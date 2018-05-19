var async = require("async")
async.series([
    open,
    dropDatabase,
    requireModels,
    createHeroes
],function(err){
    mongoose.disconnect(callback);
});
