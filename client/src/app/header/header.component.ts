import { Component ,inject,OnInit} from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
    
    userService= inject(UserService)
   
    status:boolean;
    ngOnInit():void{
      this.userService.getUserLoginStatus().subscribe({
        next:(userLoginStatus)=>{this.status=userLoginStatus}
      })
    }
}
