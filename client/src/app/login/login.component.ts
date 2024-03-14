import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AdminService } from '../../services/admin.service';
import { NgToastService } from 'ng-angular-popup';

 
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  fb: FormBuilder = inject(FormBuilder);
  userService = inject(UserService);
  adminService= inject(AdminService);
  toast=inject(NgToastService)
  router = inject(Router)
 
  userCredentialsError={
    userCredErrStatus:false,
    userCredErrMsg:""
  }
userCredentials:FormGroup
  ngOnInit(){
    this.userCredentials = this.fb.group({
      loginType:'user',
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(6)]],
      password: ['', Validators.required]
    })
  }
 
 
  onSubmitUser() {
   
   const formData=this.userCredentials.value;
 
   if(formData.loginType==='user'){
    this.userService.userLogin(this.userCredentials.value).subscribe({
      next:(res) => {
        if (res.message === 'login success') {
          //store token in local/session storage
          localStorage.setItem('token', res.token)
          //set user status and current user to service
          this.userService.setUserLoginStatus(true)
          this.userService.setCurrentUser(res.user)
          //navigate to user profile
          this.router.navigate([`/complaintform/${res.user.username}`])
          this.toast.success({
            detail:'login done',
            summary:'loggedIn as user',
            position:'topRight',
            duration:5000
          })
        }
        else {
          this.userCredentialsError={
            userCredErrStatus:true,
            userCredErrMsg:res.message
          }
        }
      }, error:(error) => {
        console.log('err in user login', error.message)
      }
   })
   }
 
   else{
    this.adminService.userAdminLogin(this.userCredentials.value).subscribe({
      next:(res) => {
        if (res.message === 'login success') {
          //store token in local/session storage
          localStorage.setItem('token', res.token)
          //set user status and current seller to service
          this.userService.setUserLoginStatus(true)
          this.userService.setCurrentUser(res.user)
          //navigate to user profile
          this.router.navigate([`/admin/${res.user.username}`])
          this.toast.success({
            detail:'login done',
            summary:'loggedIn as admin',
            position:'topRight',
            duration:5000
          })
        }
        else {
          this.userCredentialsError={
            userCredErrStatus:true,
            userCredErrMsg:res.message
          }
        }
      }, error:(error) => {
        console.log('err in admin login', error)
      }
   })
   }
   
  }
}