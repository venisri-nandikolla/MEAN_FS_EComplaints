//create express app
const exp=require('express')
const app=exp()
const path=require('path')

//configure environment variables
require('dotenv').config()
//add body parsing middleware
app.use(exp.json())

const mongoose=require('mongoose');
const DB_URL=process.env.LOCAL_DB_URL;
//coonect to DB
mongoose.connect(DB_URL)
.then(()=>console.log("DB connection success"))
.catch(err=>console.log("Error in DB connect",err))
 

//connect angular app with server
app.use(exp.static(path.join(__dirname,'../client/dist/project/browser')))


//import api
const userApp = require('./APIs/user-api');
const adminApp = require('./APIs/admin-api');
const complaintApp = require('./APIs/complaint-api')
//forward req to userApp when path starts with '/user-api'
app.use('/user-api',userApp)
app.use('/admin-api',adminApp);
app.use('/complaint-api',complaintApp)

//to load the front end url
app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname,'../client/dist/project/browser/index.html'))
})

//error handler 
app.use((err,req,res,next)=>{
    res.send({message:'error occurred',payload:err.message})
})

//assign port number
const PORT=process.env.PORT || 4000;
app.listen(PORT,()=>console.log(`web server started at port ${PORT}`))



