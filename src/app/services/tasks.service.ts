import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, catchError, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TasksService  implements OnInit{

  constructor(private http:HttpClient) { }
  private baseUrl = environment.baseUrl+'task'
  token=''
  ngOnInit(): void {
    this.token=this.getToken()
  }
  getAllTask(): Observable<any | undefined> {
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
  getTask(id:String): Observable<any | undefined> {
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
  updateTask(task:Task): Observable<any | undefined> {
   let body={task:task}
    const headers = new HttpHeaders({
      'x-token' : this.getToken().toString(),
    });
    return this.http.put<any>(this.baseUrl+'/full/'+task.id,task,{headers}).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  insertTask(task:Task): Observable<any | undefined> {
    let body={task:task}
     const headers = new HttpHeaders({
       'x-token' : this.getToken().toString(),
     });
     return this.http.post<any>(this.baseUrl,task,{headers}).pipe(
       catchError((error) =>{
         return of(undefined)
       })
     )
   }
  deleteTask(task:Task): Observable<any | undefined> {
     const headers = new HttpHeaders({
       'x-token' : this.getToken().toString(),
     });
     return this.http.delete<any>(this.baseUrl+'/'+task.id,{headers}).pipe(
       catchError((error) =>{
         return of(undefined)
       })
     )
   }

   getAllTaskDone(): Observable<any | undefined> {
    let t=this.getToken()
  
    const headers = new HttpHeaders({
      'x-token' : this.getToken().toString(),
    });
    return this.http.get<any>(this.baseUrl+'/completed',{headers}).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  getAllTaskUndone(): Observable<any | undefined> {
    let t=this.getToken()
  
    const headers = new HttpHeaders({
      'x-token' : this.getToken().toString(),
    });
    return this.http.get<any>(this.baseUrl+'/uncompleted',{headers}).pipe(
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