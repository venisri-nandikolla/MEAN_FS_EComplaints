import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ComplaintService } from '../../services/complaint.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrl: './status.component.css'
})
export class StatusComponent {
  fb = inject(FormBuilder)
  complaintService = inject(ComplaintService)

  status = this.fb.group({
    id: ['', Validators.required]
  })

  get id() {
    return this.status.get('id')
  }

  appStatus:string;
  //statuss:string
  onSearch(){
    this.complaintService.getComplaints().subscribe((lists)=>{
      console.log(lists)
      if(lists.length==0){
        this.appStatus="Your complaint is CLOSED"
      }
      lists.forEach(list => {
        //this.statuss = list.status
        if(list.id==this.status.value.id){
          
          if(list.status==="Open"){
            this.appStatus="Your complaint is OPENED"
          }else if(list.status===undefined){
            this.appStatus="Your complaint is in PROGRESS"
          }else{
            this.appStatus="Your complaint is CLOSED"
          }
        }else{
          this.appStatus="Your complaint is CLOSED"
        }
      });
    })
  }
}