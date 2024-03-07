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

  createAdminUser(newUser: User): Observable<any> {
    return this.httpClient.post('http://localhost:4000/admin-api/admin', newUser)
  }

  addComplaint(newComplaint: any): Observable<any> {
    return this.httpClient.post('http://localhost:4000/complaint-api/complaint', newComplaint)
  }

  getComplaints(): Observable<any> {
    return this.httpClient.get(`http://localhost:4000/complaint-api/complaints`)
  }

  //user login

  userLogin(usercredobj): Observable<any> {
    return this.httpClient.post('http://localhost:4000/user-api/login',usercredobj)

  }

  userAdminLogin(usercredobj): Observable<any> {
    return this.httpClient.post(`http://localhost:4000/admin-api/login`,usercredobj)

  }

  userLoginStatus = new BehaviorSubject(false);

  getUserLoginStatus() {
    return this.userLoginStatus.asObservable();
  }

  setUserLoginStatus(value: boolean) {
    this.userLoginStatus.next(value)
  }

  currentUser = new BehaviorSubject<User>({
    username:'',
    password:'',
    email:'',
    dob:''
  });
 
  getCurrentUser():Observable<User>{
    return this.currentUser.asObservable();
  }
 
  setCurrentUser(user:User){
    this.currentUser.next(user);
  }

  deleteComplaint(id: string): Observable<any> {
    console.log(id)
    return this.httpClient.delete(`http://localhost:4000/complaint-api/${id}`)
  }

updateComplaint(id:string,Complaint:any):Observable<any>{
    console.log(id,Complaint)
  return this.httpClient.put(`http://localhost:4000/complaint-api/complaint/${id}`,Complaint)
}

//logout
userLogout(){
  this.setUserLoginStatus(false)
  this.setCurrentUser({
    username:'',
    password:'',
    email:'',
    dob:''
  })
  localStorage.removeItem('token')
}
}