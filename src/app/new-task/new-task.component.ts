import { Component, OnInit } from '@angular/core';
import { CabeceraComponent } from '../cabecera/cabecera.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from '../services/tasks.service';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms';
import { Task } from '../interfaces/task';
import { User } from '../interfaces/user';
import { ConfirmComponent } from '../confirm/confirm.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [CabeceraComponent,FormsModule, ConfirmComponent, ToastModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
  providers:[MessageService]
})
export class NewTaskComponent implements OnInit {
constructor(private router : Router,private rutaActiva: ActivatedRoute, private taskService:TasksService,private userService:UserService,
  private message:MessageService,

  ){}
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
  let valido= this.taskService.validar(this.task)
  if( valido){

    this.message.add({ severity: 'info', summary: 'Creación', detail: 'En curso', life: 3000 });
    this.taskService.insertTask(this.task).subscribe({
    next: (u:any) => {
      console.log(u)
          setTimeout(() => {
            this.message.add({ severity: 'success', summary: 'Creación', detail: 'Completada', life: 3000 });
            setTimeout(() => {
              this.router.navigate(['/home'])
          }, 1000); 
        }, 2000); 
      
    },
    error: (err) => {
      console.log(err)
      this.message.add({ severity:'error', summary: 'Creación', detail: 'Cancelada', life: 3000 });
    }
  })
}else{
  this.message.add({ severity: 'warn', summary: 'Creación', detail: 'Valores introducidos no validos', life: 3000 });
}
}
crear(evento: Boolean){
  if (evento) {
    this.nuevaTarea()
  } else {
    this.message.add({ severity: 'info', summary: 'Creacion', detail: 'Cancelada', life: 3000 });
  }
}

}
