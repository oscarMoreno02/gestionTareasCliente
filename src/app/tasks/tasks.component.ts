import { Component, OnInit } from '@angular/core';
import { CabeceraComponent } from '../cabecera/cabecera.component';
import { TasksService } from '../services/tasks.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Task, TopLevel } from '../interfaces/task';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CabeceraComponent,FormsModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent implements OnInit {
  constructor(private router : Router,private rutaActiva: ActivatedRoute, private taskService:TasksService,private userService:UserService  ){
  }
  dificultades=[
    {valor:'s'},
    {valor:'m'},
    {valor:'l'},
    {valor:'xl'},

  ]
  task:Task={
    id:0,
    description:'',
    difficulty:'',
    assignment:null,
    time_estimated:0,
    time_dedicated:0,
    progress:0,
    done:false,
    createdAt:'',
    updatedAt:''
  } 
  users :Array<User>=[]

  ngOnInit(): void {
    let id = this.rutaActiva.snapshot.params['id']
    this.taskService.getTask(id).subscribe({
      next: (t:TopLevel | undefined) => {
        this.task=t!.data

        console.log(this.task)
      },
      error: (err) => {
        console.log(err)
      }
    })
    this.userService.getAllUser().subscribe({
      next: (u:Array <User>) => {
        this.users=u!
        console.log(this.users)
      
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  guardarDatos=()=>{
    this.taskService.updateTask(this.task).subscribe({
      next: (u:any) => {
        
        console.log(u)
      
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  borrarTarea=()=>{
    this.taskService.deleteTask(this.task).subscribe({
      next: (u:any) => {
        
        console.log(u)
        this.router.navigate(['/home'])
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
