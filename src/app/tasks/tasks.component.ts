import { Component, OnInit, inject } from '@angular/core';
import { CabeceraComponent } from '../cabecera/cabecera.component';
import { TasksService } from '../services/tasks.service';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Task, TopLevel } from '../interfaces/task';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { SliderComponent } from '../slider/slider.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CabeceraComponent,FormsModule,SliderComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent implements OnInit {
  constructor(private router : Router,private rutaActiva: ActivatedRoute, private taskService:TasksService,private userService:UserService  ){
  }
  roles=['']
  uid=0
  valid=[true]
  authservice=inject(AuthService)

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
    this.roles=this.authservice.getRoles()
    this.uid=this.authservice.getUid()
    
    let id = this.rutaActiva.snapshot.params['id']
    this.taskService.getTask(id).subscribe({
      next: (t:TopLevel | undefined) => {
        if(this.roles.includes('admin')){
          this.task=t!.data
      
        }else{
          if(t!.data.assignment!=this.uid){
            
            this.router.navigate(['/home'])
          }else{
            this.task=t!.data
          }
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
    if(this.roles.includes('admin')){
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
  }
  guardarDatos=()=>{
  let valido= this.validar()
   if( valido){
    if(this.roles.includes('admin')){

      this.taskService.updateTask(this.task).subscribe({
        next: (u:any) => {
         
         console.log(u)
         
        },
        error: (err) => {
          console.log(err)
        }
      })
    }else{
      this.taskService.updateTaskByUser(this.task).subscribe({
        next: (u:any) => {
         
         console.log(u)
         
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
    }else{
      alert('error')
    
    }
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
  checkDone(){
    if(this.task.progress==100){
      this.task.done=true
    }else{
      this.task.done=false
    }
  }
  validar(): boolean {
    let validaciones = []; 
    if (this.task.progress < 0 || this.task.progress > 100 || !Number.isInteger(this.task.progress)) {
        validaciones.push(false); 
    }


    if (this.task.time_dedicated < 0 || this.task.time_dedicated > 100 || !Number.isInteger(this.task.time_dedicated)) {
        validaciones.push(false);
    }


    if (validaciones.includes(false)) {
        return false; 
    } else {
        return true; 
    }
}

}
