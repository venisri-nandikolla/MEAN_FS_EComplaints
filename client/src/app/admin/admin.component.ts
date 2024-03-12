import { Component ,OnInit,inject, ChangeDetectorRef} from '@angular/core';
import { ComplaintService } from '../../services/complaint.service';
import { Customer } from '../models/Customer';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  compliantService=inject(ComplaintService)
  cdr= inject (ChangeDetectorRef)
  complaints:any[];
  status:boolean=true;
  openStatus:string;
  ngOnInit(): void {
    this.compliantService.getComplaints().subscribe({
      next:(res)=>{
        this.complaints = res.payload;
      }
    })
  }
  
onClose(id:string,complaint:any){
  complaint.status="Closed"
  let index = this.complaints.findIndex((complaint)=>{
    return complaint._id===id;
  })
  this.complaints.splice(index,1);
  this.compliantService.updateComplaint(id,complaint).subscribe(
    {next:(res)=>console.log(res),
    error:(err)=>{console.log(err)}});
}

onOpen(id:string,Complaint:any){
  Complaint['status'] = "Opened";
  this.compliantService.updateComplaint(id,Complaint).subscribe({
    next:(res)=>{
      console.log(res);
    },
    error:(err)=>{
      console.log(err);
    }
  })
}

}
