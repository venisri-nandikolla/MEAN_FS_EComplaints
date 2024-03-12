import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ComplaintService } from '../../services/complaint.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrl: './status.component.css'
})
export class StatusComponent implements OnInit {
  fb = inject(FormBuilder)
  complaintService = inject(ComplaintService)
  userService = inject(UserService)
  router = inject(Router)
  username: string;

  status = this.fb.group({
    id: ['', Validators.required]
  })

  get id() {
    return this.status.get('id')
  }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe({
      next: (res) => {
        this.username = res.username;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  navigateBack() {
    this.router.navigate([`/complaintform/${this.username}`])
  }

  appStatus: string;
  //statuss:string
  onSearch() {
    this.complaintService.getComplaints().subscribe({
      next: (res) => {
        let lists = res.payload;
        if (lists.length == 0) {
          this.appStatus = "Enter a valid Complaint ID";
        }
        let complaint = lists.find((comp)=>{
          return comp._id === this.status.value.id;
        })
   
        if(complaint === undefined){
          this.appStatus = "Enter valid Complaint ID"
        }else{
          if (complaint.status === "Opened") {
            this.appStatus = "Your Complaint is OPENED"
          } else if (complaint.status === "Progress") {
            this.appStatus = "Your Complaint is in PROGRESS"
          }else if (complaint.status === "Closed"){
            this.appStatus = "Your Complaint is CLOSED"
          }
        }
      }
    })
  }
}