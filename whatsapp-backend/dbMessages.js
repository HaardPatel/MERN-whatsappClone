var moongoose = require("mongoose");

const whatsappSchema=moongoose.Schema({
    message:String,
    name:String,
    timestamp:String,
    received:Boolean
});

//collection
module.exports = moongoose.model('messagecontents', whatsappSchema);
