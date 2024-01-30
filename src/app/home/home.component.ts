import { Component, OnInit } from '@angular/core';
import { CabeceraComponent } from '../cabecera/cabecera.component';
import { TasksComponent } from '../tasks/tasks.component';
import { Router, RouterLink } from '@angular/router';
import { TasksService } from '../services/tasks.service';
import {Subscription } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CabeceraComponent,TasksComponent,
    HttpClientModule,RouterLink,FormsModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [TasksService],
})
export class HomeComponent implements OnInit {
  tasklist: any[] = [];
  tipoTabla=0
  taskSubscription: Subscription=new Subscription;
  roles=['']
  uid=0
  contador=0

  constructor(private taskService: TasksService, private router: Router,private authservice:AuthService) { }
  
  ngOnInit(): void {


    this.uid=this.authservice.getUid()
    this.roles=this.authservice.getRoles()
    this.taskSubscription = this.taskService.getAllTask().subscribe({
      next: (data: any) => {
        
        this.tasklist=this.filtrar(data.data);
        console.log(this.tasklist)
      },
      error: (err) => {
        console.log(err);
      }
    });

    console.log(this.tasklist)

}
filtrar(data:any):any{
  if(this.roles.includes('admin')){
    return data
  }else{
    let lista=[]
    for(let i=0;i<data.length;i++){
      if(data[i].assignment==this.uid){
        lista.push(data[i])
      }
    }
    return lista
  }
}
evaluarTabla=()=>{
  console.log('llega')
if(this.tipoTabla==0){
  console.log('todas')
  console.log(this.tipoTabla)
  this.taskSubscription = this.taskService.getAllTask().subscribe({
    next: (data: any) => {
    
      this.tasklist=data.data;
      console.log(this.tasklist)
    },
    error: (err) => {
      console.log(err);
    }
  });
}else if(this.tipoTabla==1){
  console.log('realizadas')
  console.log(this.tipoTabla)
  this.taskSubscription = this.taskService.getAllTaskDone().subscribe({
    next: (data: any) => {
    
      this.tasklist=data.data;
      console.log(this.tasklist)
    },
    error: (err) => {
      console.log(err);
    }
  });
  }else{
    console.log('sin realizar')
  console.log(this.tipoTabla)
    this.taskSubscription = this.taskService.getAllTaskUndone().subscribe({
      next: (data: any) => {
      
        this.tasklist=data.data;
        console.log(this.tasklist)
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
}