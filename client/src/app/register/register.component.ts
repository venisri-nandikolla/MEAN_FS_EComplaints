import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { Router } from '@angular/router'
import { UserService } from '../../services/user.service';
import { Admin } from '../models/admins';
import { User } from '../models/users';
import { AdminService } from '../../services/admin.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  //getter and setter methods
  get username() {
    return this.registerForm.get('username')
  }


  get password() {
    return this.registerForm.get('password')
  }
  get email() {
    return this.registerForm.get('email')
  }
  get dob() {
    return this.registerForm.get('dob')
  }


  duplicateUserStatus: boolean = false;
  duplicateAdminStatus: boolean = false;
  router = inject(Router)
  userService = inject(UserService);
  adminService = inject(AdminService);
  toast = inject(NgToastService)
  registerForm: FormGroup;
  fb: FormBuilder = inject(FormBuilder);

  ngOnInit() {
    this.registerForm = this.fb.group({
      registerType: 'user',
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required]
    })
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      if (formData.registerType === 'user') {
        let { username, password, email, dob } = this.registerForm.value;
        let newUser = new User(username, password, email, dob);
        this.userService.createUser(newUser).subscribe({
          next: (res) => {
            if (res.message === "User created") {
             
              this.router.navigate(['/login'])
              this.toast.success({
                detail: 'Registration done',
                summary: 'Registered as user',
                position: 'topRight',
                duration: 5000
              })
            }
            else {
              this.duplicateUserStatus = true;
            }

          }, error: (error) => {
            console.log('error in user creation', error)
          }
        })

      }
      else if (formData.registerType === 'admin') {
        let { username, password, email, dob } = this.registerForm.value;
        let newAdmin = new Admin(username, password, email, dob);
        this.adminService.createAdminUser(newAdmin).subscribe(
          (res) => {
            console.log("admin", res)
            //navigate to login
            if (res.message === "Admin created") {
              console.log(res)
              this.router.navigate(['/login'])
              this.toast.success({
                detail: 'Registration done',
                summary: 'Registered as admmin',
                position: 'topRight',
                duration: 5000
              })
            }
            else {
              this.duplicateAdminStatus = true;
            }
          }, (error) => {
            console.log('error in admin creation', error)
          }
        )
      }
      else {
        console.log('form is invalid')
      }
    }

  }

}