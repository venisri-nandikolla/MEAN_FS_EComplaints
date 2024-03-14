import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, } from '@angular/forms'
import { Router } from '@angular/router';
import { Complaint } from '../models/complaint';
import { ComplaintService } from '../../services/complaint.service';

@Component({
  selector: 'app-complaintform',
  templateUrl: './complaintform.component.html',
  styleUrl: './complaintform.component.css'
})
export class ComplaintformComponent {


 
  fb: FormBuilder = inject(FormBuilder);
  complaintService = inject(ComplaintService)
  router = inject(Router)

  complaintForm = this.fb.group({
    fname: ['', [Validators.required]],
    lname: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phno: ['', [Validators.required, Validators.pattern(/^[6-9]{1}[0-9]{9}$/)]],
    date: ['', [Validators.required]],
    reason: ['', [Validators.required]],
    details: ['', [Validators.required]],
  });

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


  currentComplaint: any
  complaintsList: any;
  getAllComplaints() {
    this.complaintService.getComplaints().subscribe((res) => {
      this.complaintsList = res.payload;
      this.currentComplaint = this.complaintsList[this.complaintsList.length - 1];
      this.changeStatus()
    })
  }



  status: string;
  checkStatus: string;
  changeStatus() {
    this.status = `Your complaint is registerd successfully! And your complaint ID is ${this.currentComplaint._id}`
    this.checkStatus = `To Check Your Complaint Status`
  }

  alreadyExisted: boolean = false;
  alreadyExistedMsg: string = '';

  onSubmitComplaint() {
    let { fname, lname, email, phno, date, reason, details } = this.complaintForm.value;
    let newComplaint = new Complaint(fname, lname, email, phno, date, reason, details);
    if (this.complaintForm.status === 'VALID') {
      this.complaintService.addComplaint(newComplaint).subscribe({
        next: (res) => {
          if (res.message === "Complaint created") {
            this.alreadyExisted = false;
            this.alreadyExistedMsg = '';
            this.getAllComplaints();
          } else if (res.message === "Complaint already created") {
            this.alreadyExisted = true;
            this.alreadyExistedMsg = "Complaint already registered";
          }


        },
        error: (err) => {
          console.log("error in complaint creation", err)
        }
      })
    }
  }
}
