import { Component, OnInit } from '@angular/core';
import { CabeceraComponent } from '../cabecera/cabecera.component';
import { Router, RouterLink } from '@angular/router';

import {Subscription } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Ranking, RankingElement } from '../interfaces/ranking';
@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [CabeceraComponent,
    HttpClientModule,RouterLink,FormsModule],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.css'
})
export class RankingComponent  implements OnInit{
  constructor(private userService: UserService, private router: Router) { }
  ranking: Ranking = {ranking:[{id:0,first_name:'',last_name:'',email:'',tasks_completed:0}]};
  list:Array<RankingElement>=[]
  subscription: Subscription=new Subscription;

ngOnInit(): void {
  this.subscription = this.userService.getRanking().subscribe({
    next: (data: any) => {

      this.ranking.ranking=data.ranking[0];
    },
    error: (err) => {
      console.log(err);
    }
  });
}
}
