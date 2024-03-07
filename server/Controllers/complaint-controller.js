const Complaint = require("../Models/complaint");
 
const getAllComplaints = async (req,res)=>{
    const complaints = await Complaint.find();
    res.status(200).send({ message: "All Complaints", payload: complaints });
}
 
const getComplaintById = async (req,res)=>{
    let id = req.params.id;
    const complaint = await Complaint.findById(id);
    res.send({message:"Complaint found",payload:complaint})
}
 
const createComplaint = async (req,res)=>{
    const newComplaint = await Complaint.create(req.body);
    res.status(200).send({ message: "Complaint created", payload: newComplaint });
}
 
const updateComplaint = async (req,res)=>{
    let id = req.params.id
    let updatedComplaint = await Complaint.findByIdAndUpdate(id,req.body);
    res.send({message:"Complaint updated",payload:updatedComplaint});
}
 
const deleteComplaint = async (req,res)=>{
    let id = req.params.id
    let deletedComplaint = await Complaint.findByIdAndDelete(id);
    res.send({message:"Complaint deleted",payload:deletedComplaint});
}
 
module.exports = { getAllComplaints,getComplaintById,createComplaint,updateComplaint,deleteComplaint}