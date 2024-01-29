import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-cabecera',
  standalone: true,
  imports: [],
  templateUrl: './cabecera.component.html',
  styleUrl: './cabecera.component.css'
})
export class CabeceraComponent implements OnInit {
  roles=['']
  constructor(private authservice:AuthService){}
  ngOnInit(): void {
    let lista=this.authservice.getRoles()
    if(lista){

      this.roles=lista
    }

  }

}
