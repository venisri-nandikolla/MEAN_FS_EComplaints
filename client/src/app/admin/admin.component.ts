import { Component ,OnInit,inject, ChangeDetectorRef} from '@angular/core';
import { UserService } from '../../services/user.service';
import { Customer } from '../models/Customer';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  userService=inject(UserService)
  cdr= inject (ChangeDetectorRef)
  complaints:any;
  status:boolean=true;
  openStatus:string;
  ngOnInit(): void {
    this.complaints=this.userService.getComplaints()
  }
  
onClose(id:string){
  this.userService.deleteComplaint(id).subscribe((res)=>console.log(res),(err)=>{console.log(err)});
  
  this.cdr.detectChanges();

}
onOpen(id:string,Complaint:Customer){
  
  Complaint['status']="Open";
  this.userService.updateComplaint(id,Complaint).subscribe(
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
