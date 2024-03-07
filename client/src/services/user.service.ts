import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../app/models/users';
import { Observable, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})



export class UserService {

  httpClient = inject(HttpClient)

  createUser(newUser: User): Observable<any> {
    return this.httpClient.post('http://localhost:4000/user-api/user', newUser)
  }

  
  //user login

  userLogin(usercredobj): Observable<any> {
    return this.httpClient.post('http://localhost:4000/user-api/login', usercredobj)

  }
  userLoginStatus = new BehaviorSubject(false);

  getUserLoginStatus() {
    return this.userLoginStatus.asObservable();
  }

  setUserLoginStatus(value: boolean) {
    this.userLoginStatus.next(value)
  }

  currentUser = new BehaviorSubject<User>({
    username: '',
    password: '',
    email: '',
    dob: ''
  });

  getCurrentUser(): Observable<User> {
    return this.currentUser.asObservable();
  }

  setCurrentUser(user: User) {
    this.currentUser.next(user);
  }


  //logout
  userLogout() {
    this.setUserLoginStatus(false)
    this.setCurrentUser({
      username: '',
      password: '',
      email: '',
      dob: ''
    })
    localStorage.removeItem('token')
  }
}