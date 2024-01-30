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
import { SpinnerService } from '../services/spinner.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmComponent } from '../confirm/confirm.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CabeceraComponent,FormsModule,SliderComponent,ConfirmDialogModule,ConfirmComponent,ToastModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  providers:[MessageService]
})
export class TasksComponent implements OnInit {
  constructor(
    private router: Router,
    private rutaActiva: ActivatedRoute,
    private taskService: TasksService,
    private userService: UserService,
    private message: MessageService,
    private authService: AuthService,
    private sliderService: SpinnerService
  ) {}
  roles=['']
  uid=0
  valid=[true]
  

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
  n=0
  users :Array<User>=[]

  ngOnInit(): void {
    this.roles=this.authService.getRoles()
    this.uid=this.authService.getUid()
    
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
    this.sliderService.currentSliderValue.subscribe(value =>this.task.progress= value)
  console.log(this.task.progress)
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
  let valido= this.taskService.validar(this.task)
   if( valido){
    if(this.roles.includes('admin')){
      this.message.add({ severity: 'info', summary: 'Actualizacion', detail: 'En curso', life: 3000 });
      this.taskService.updateTask(this.task).subscribe({
        next: (u:any) => {

         this.message.add({ severity: 'success', summary: 'Actualizacion', detail: 'Completada', life: 3000 });
        },
        error: (err) => {
          this.message.add({ severity: 'error', summary: 'Actualizacion', detail: 'Cancelada', life: 3000 });
        }
      })
    }else{
      this.message.add({ severity: 'info', summary: 'Actualizacion', detail: 'En curso', life: 3000 });
      this.taskService.updateTaskByUser(this.task).subscribe({
        next: (u:any) => {
          this.message.add({ severity: 'success', summary: 'Actualizacion', detail: 'Completada', life: 3000 });
         
        },
        error: (err) => {
          this.message.add({ severity: 'error', summary: 'Actualizacion', detail: 'Cancelada', life: 3000 });
        }
      })
    }
    }else{
      this.message.add({ severity: 'warn', summary: 'Actualizacion', detail: 'Valores introducidos no validos', life: 3000 });
    
    }
  }

  borrarTarea=()=>{
    this.taskService.deleteTask(this.task).subscribe({
      next: (u:any) => {
        this.message.add({ severity: 'info', summary: 'Eliminación', detail: 'En curso', life: 3000 });
          setTimeout(() => {
            this.message.add({ severity: 'success', summary: 'Eliminación', detail: 'Completada', life: 3000 });
            setTimeout(() => {
              this.router.navigate(['/home'])
          }, 1000); 
        }, 2000); 
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  checkDone(value: number){
    this.task.progress = value;
    if(this.task.progress == 100){
      this.task.done = true;
    } else {
      this.task.done = false;
    }
  }

actualizar(evento: boolean) {
  if (evento) {
    this.guardarDatos()
  } else {
    this.message.add({ severity: 'info', summary: 'Actualizacion', detail: 'Cancelada', life: 3000 });
  }
}
borrar(evento: Boolean){
  if (evento) {
    this.borrarTarea()
  } else {
    this.message.add({ severity: 'info', summary: 'Eliminación', detail: 'Cancelada', life: 3000 });
  }
}
}
