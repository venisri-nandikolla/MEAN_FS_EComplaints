const mongoose = require('mongoose')
//create User schema
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,'Username is required, but missed'],
    },
    password:{
        type:String,
        required:[true,'Password is required']
    },
    email:String,
    dob:Date
})
 
//create Model(class) for the userSchema
const User=mongoose.model('user',userSchema)
 
//export User model
module.exports=User;