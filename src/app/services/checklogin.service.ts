import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CheckloginService {

  constructor(private http: HttpClient) { }

  private baseUrl = environment.baseUrl+'login'

  checkLogin(email:String,password:String): Observable<any | undefined> {
    let body={email:email,password:password}
    return this.http.put<any>(this.baseUrl,body).pipe(

      catchError((error) =>{
        return of(undefined)
      })
    )
  }
}
