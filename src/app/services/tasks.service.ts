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
    
    )
  }
  updateTaskByUser(task:Task): Observable<any | undefined> {
    let body={task:task}
     const headers = new HttpHeaders({
       'x-token' : this.getToken().toString(),
     });
     return this.http.put<any>(environment.baseUrl+'/user/task/full/'+task.id,task,{headers}).pipe(
      
     )
   }
  insertTask(task:Task): Observable<any | undefined> {
    let body={task:task}
     const headers = new HttpHeaders({
       'x-token' : this.getToken().toString(),
     });
     return this.http.post<any>(this.baseUrl,task,{headers}).pipe(
     
     )
   }
  deleteTask(task:Task): Observable<any | boolean> {
     const headers = new HttpHeaders({
       'x-token' : this.getToken().toString(),
     });
     return this.http.delete<any>(this.baseUrl+'/'+task.id,{headers}).pipe(
      
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
  validar(task:Task): boolean {
    let validaciones = []; 
    if(task.description.trim().length==0){
      validaciones.push(false)
    }
    if (task.progress < 0 ||task.progress > 100 || !Number.isInteger(task.progress)) {
        validaciones.push(false); 
    }
    if (task.time_dedicated < 0 || task.time_dedicated > 100 || !Number.isInteger(task.time_dedicated)) {
        validaciones.push(false);
    }
    if (validaciones.includes(false)) {
        return false; 
    } else {
        return true; 
    }
}
}