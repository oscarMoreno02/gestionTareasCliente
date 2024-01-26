import { Component, OnInit } from '@angular/core';
import { CabeceraComponent } from '../cabecera/cabecera.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from '../services/tasks.service';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms';
import { Task } from '../interfaces/task';
import { User } from '../interfaces/user';


@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [CabeceraComponent,FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent implements OnInit {
constructor(private router : Router,private rutaActiva: ActivatedRoute, private taskService:TasksService,private userService:UserService ){}
dificultades=[
  {valor:'s'},
  {valor:'m'},
  {valor:'l'},
  {valor:'xl'},

]
task:Task={
  id:0,
  description:'',
  difficulty:'s',
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
nuevaTarea=()=>{
  this.taskService.insertTask(this.task).subscribe({
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
