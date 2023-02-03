const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const fileSchema=new Schema({
    name:{
        type:String
    },
    path:{
        type:String
    }
});

const File=mongoose.model("file",fileSchema);
module.exports =File;