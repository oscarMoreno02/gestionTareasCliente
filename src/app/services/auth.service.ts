import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { 
   this.t=this.getToken()
  this.payload=jwtDecode<any>(this.t)
   this.abilities=this.payload.abilities
  }
 t?
 payload?
 abilities?

  hasRol(rol:Array<String>):boolean{
    console.log(rol)
    console.log(this.t)
    let pasa=false
    for (let i =0;i<rol.length;i++){
      if(this.abilities!.includes(rol[i])){      
        pasa=true
      }
    }
    return pasa
  }

  getToken(): string  {
    const serializedObj = sessionStorage.getItem('token');
    if (serializedObj) {
      return serializedObj
    }else{
      return ''
    }
  }
  getRoles(){
      return this.abilities
  }
  getUid(){
    return this.payload.uid
  }
  getName(){
    console.log(this.payload.uname)
    return this.payload.uname
  }
}
