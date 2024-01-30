import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cabecera',
  standalone: true,
  imports: [],
  templateUrl: './cabecera.component.html',
  styleUrl: './cabecera.component.css'
})
export class CabeceraComponent implements OnInit {
  roles=['']
  nombre=''
  nombreaux=''
  router=inject(Router)
  constructor(private authservice:AuthService){}
  ngOnInit(): void {
    this.nombre=this.authservice.getName()
    this.nombreaux=this.nombre
    let lista=this.authservice.getRoles()
    if(lista){
      this.roles=lista
    }
  }
  logout(){
    sessionStorage.removeItem('token')
    window.location.href=''
  }

}
