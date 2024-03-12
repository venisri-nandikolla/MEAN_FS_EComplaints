const mongoose = require('mongoose')
//create User schema
const complaintSchema=new mongoose.Schema({
    fname:{type:String,required:true},
    lname:{type:String,required:true},
    email:{type:String,required:true},
    phno:{type:String,required:true},
    date:{type:String,required:true},
    reason:{type:String,required:true},
    details:{type:String,required:true},
    status:{type:String,required:true}
})
 
//create Model(class) for the userSchema
const Complaint=mongoose.model('complaint',complaintSchema)
 
//export User model
module.exports=Complaint;