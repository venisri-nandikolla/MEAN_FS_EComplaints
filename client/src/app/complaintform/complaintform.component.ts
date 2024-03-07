import { Component, inject, signal } from '@angular/core';
import {  FormBuilder,Validators,} from '@angular/forms'
import { Router } from '@angular/router';
import { Customer } from '../models/Customer';
import { ComplaintService } from '../../services/complaint.service';

@Component({
  selector: 'app-complaintform',
  templateUrl: './complaintform.component.html',
  styleUrl: './complaintform.component.css'
})
export class ComplaintformComponent {
  
 
  // getters and setters
  get fname() {
    return this.complaintForm.get('fname')
  }
 
  get lname() {
    return this.complaintForm.get('lname')
  }
 
  get email() {
    return this.complaintForm.get('email')
  }
 
  get phno() {
    return this.complaintForm.get('phno')
  }
  get date() {
    return this.complaintForm.get('date')
  }
  get reason() {
    return this.complaintForm.get('reason')
  }
  get details() {
    return this.complaintForm.get('details')
  }
 
fb:FormBuilder=inject(FormBuilder);
complaintService=inject(ComplaintService)
router=inject(Router)
 
complaintForm=this.fb.group({
  fname:['',[Validators.required]],
  lname:['',[Validators.required]],
  email:['',[Validators.required,Validators.email]],
  phno:['',[Validators.required,Validators.pattern(/^[6-9]{1}[0-9]{9}$/)]],
  date:['',[Validators.required]],
  reason:['',[Validators.required]],
  details:['',[Validators.required]],
});

currentComplaint:any
complaintsList:any;
getAllComplaints(){
  this.complaintService.getComplaints().subscribe((res)=>{
    this.complaintsList = res.payload;
    console.log(this.complaintsList)
    this.currentComplaint= this.complaintsList[this.complaintsList.length -1];
    console.log(this.currentComplaint)
    this.changeStatus()
  })
}

  

status:string;
checkStatus:string;
changeStatus(){
  this.status=`Your complaint is registerd successfully! And your complaint ID is ${this.currentComplaint._id}`
  this.checkStatus=`To Check Your Complaint Status`
}
 
onSubmitComplaint(){
  let {fname,lname,email,phno,date,reason,details}=this.complaintForm.value;
  let newCustomer=new Customer(fname,lname,email,phno,date,reason,details);
  this.complaintService.addComplaint(newCustomer).subscribe(
    (res)=>{
      console.log(res)
      if(this.complaintForm.status==='VALID'){
        this.getAllComplaints();
       }
    },
    (err)=>{
      console.log("error in Customer creation",err)
    }
 
  )
}
statuss:boolean
 onclickk(){
    this.statuss=true
 }
}
