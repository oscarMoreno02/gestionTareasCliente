import { Component, OnInit } from '@angular/core';
import { CabeceraComponent } from '../cabecera/cabecera.component';
import { Router, RouterLink } from '@angular/router';

import {Subscription } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Usertask } from '../interfaces/usertask';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-user-task',
  standalone: true,
  imports: [FormsModule,HttpClientModule,RouterLink,CabeceraComponent],
  templateUrl: './user-task.component.html',
  styleUrl: './user-task.component.css'
})
export class UserTaskComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) { }
  usertask:Usertask={first_name:'',last_name:'',email:'',tasks:[],createdAt:'',updatedAt:''}
  userList!:Array<User>
  subscription: Subscription=new Subscription;
  idUsuario=0
ngOnInit(): void {
  this.subscription = this.userService.getAllUser().subscribe({
    next: (data: any) => {
      this.userList=data;
    },
    error: (err) => {
      console.log(err);
    }
  });
}
refrescar(){
  this.subscription = this.userService.getUserTask(this.idUsuario).subscribe({
    next: (data: any) => {
      this.usertask=data[0]
      console.log(data[0])
    },
    error: (err) => {
      console.log(err);
    }
  });
}
}
