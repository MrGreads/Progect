var mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/test")
var Cat = mongoose.model("Cat",{
    name:String
})
var schema = mongoose.Schema({name:String})
schema.methods.meow = function(){
    console.log(this.name + " сказал Мяу")
}
var Cat = mongoose.model("Cat",schema)
var kitten = new Cat({
    name:"Pushok"
})
kitten.meow()
kitten.save(function(err,kitten){
    if(err){
        console.log(err)
    } else {
        console.log(kitten)
    }
})
