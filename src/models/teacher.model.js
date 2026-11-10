const mongoose = require("mongoose")

const teacherSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        unique:true,
        index:true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password:{
        type:String,
        min:[6,"too weak password"],
        select:false
    },
    post:{
        type:String,
        enum:["teacher","sister","driver","principal","vice Principal","BOD","other staff","office staff"],
        default:"teacher"
    },
    isAdmin:{
        type:Boolean,
        default:false,
        immutable:true,
        select:false
    }

})

const teacherModel = mongoose.model("teacher",teacherSchema)

module.exports = teacherModel