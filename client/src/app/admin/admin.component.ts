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
  complaints:any;
  status:boolean=true;
  openStatus:string;
  ngOnInit(): void {
    this.compliantService.getComplaints().subscribe({
      next:(res)=>{
        this.complaints = res.payload;
      }
    })
  }
  
onClose(id:string){
  this.compliantService.deleteComplaint(id).subscribe((res)=>console.log(res),(err)=>{console.log(err)});
}
onOpen(id:string,Complaint:Customer){
  
  Complaint['status']="Open";
  this.compliantService.updateComplaint(id,Complaint).subscribe(
    (res)=>{
      this.status=false;
      this.openStatus=`Application Already Opened`
      console.log(res)},
    (err)=>{
      console.log(err)
    }
  )
}

}
