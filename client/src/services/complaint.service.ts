import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  httpClient= inject(HttpClient)
  addComplaint(newComplaint: any): Observable<any> {
    return this.httpClient.post('http://localhost:4000/complaint-api/complaint', newComplaint)
  }

  getComplaints(): Observable<any> {
    return this.httpClient.get(`http://localhost:4000/complaint-api/complaints`)
  }


  deleteComplaint(id: string): Observable<any> {
    return this.httpClient.delete(`http://localhost:4000/complaint-api/complaint/${id}`)
  }

  updateComplaint(id:string,Complaint:any):Observable<any>{
    return this.httpClient.put(`http://localhost:4000/complaint-api/complaint/${id}`,Complaint)
  }
}
