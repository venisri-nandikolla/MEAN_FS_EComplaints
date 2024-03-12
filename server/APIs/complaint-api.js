const exp = require("express");
const complaintApp = exp.Router();
 
const expressAsyncHandler = require("express-async-handler");
const verifyToken = require('../Middlewares/verifyToken')
 
 
const {
    getAllComplaints,
    getComplaintById,
    createComplaint,
    updateComplaint,
    deleteComplaint
} = require("../Controllers/complaint-controller");
 
 
complaintApp.get("/complaints",verifyToken, expressAsyncHandler(getAllComplaints));
 
complaintApp.get("/complaints/:id",verifyToken, expressAsyncHandler(getComplaintById));
 
complaintApp.post("/complaint",verifyToken, expressAsyncHandler(createComplaint));
 
complaintApp.put("/complaint/:id",verifyToken, expressAsyncHandler(updateComplaint));
 
complaintApp.delete("/complaint/:id",verifyToken, expressAsyncHandler(deleteComplaint));
 
 
module.exports = complaintApp;