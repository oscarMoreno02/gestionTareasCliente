import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, catchError, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {jwtDecode} from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {

  constructor(private http:HttpClient) { }
  private baseUrl = environment.baseUrl+'user'
  token=''
  ngOnInit(): void {
 
  }
  getAllUser(): Observable<any | undefined> {
    let t=this.getToken()

   
    const headers = new HttpHeaders({
      'x-token' : this.getToken().toString(),
    });
    return this.http.get<any>(this.baseUrl,{headers}).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  getUser(id:String): Observable<any | undefined> {
    let t=this.getToken()
   
    const headers = new HttpHeaders({
      'x-token' : this.getToken().toString(),
    });
    return this.http.get<any>(this.baseUrl+'/'+id,{headers}).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  getRanking(): Observable<any | undefined> {
    let t=this.getToken()
  
    const headers = new HttpHeaders({
      'x-token' : this.getToken().toString(),
    });
    return this.http.get<any>(this.baseUrl+'/task/ranking',{headers}).pipe(
      catchError((error) =>{
        console.log(error.status)
        return of (error)
      })
    )
  }
  getUserTask(id:number): Observable<any | undefined> {
    let t=this.getToken()
  
    const headers = new HttpHeaders({
      'x-token' : this.getToken().toString(),
    });
    return this.http.get<any>(this.baseUrl+'/task/'+id,{headers}).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }


  getToken(): string {
    const serializedObj = sessionStorage.getItem('token');
    if (serializedObj) {
      this.token = serializedObj; 
      console.log(serializedObj);
    }
    return this.token;
  }
  
}
