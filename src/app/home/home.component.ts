import { Component, OnInit } from '@angular/core';
import { CabeceraComponent } from '../cabecera/cabecera.component';
import { TasksComponent } from '../tasks/tasks.component';
import { CheckloginService } from '../services/checklogin.service';
import { Router, RouterLink } from '@angular/router';
import { TasksService } from '../services/tasks.service';
import {Subscription } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CabeceraComponent,TasksComponent,
    HttpClientModule,RouterLink ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [TasksService],
})
export class HomeComponent implements OnInit {
  tasklist: any[] = [];
  taskSubscription: Subscription=new Subscription;

  constructor(private taskService: TasksService, private router: Router) { }

  ngOnInit(): void {

    this.taskSubscription = this.taskService.getAllTask().subscribe({
      next: (data: any) => {
      
        this.tasklist=data.data;
        console.log(this.tasklist)
      },
      error: (err) => {
        console.log(err);
      }
    });

    console.log(this.tasklist)
}
}