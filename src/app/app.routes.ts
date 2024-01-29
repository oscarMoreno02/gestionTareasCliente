import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TasksComponent } from './tasks/tasks.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { RankingComponent } from './ranking/ranking.component';
import { UserTaskComponent } from './user-task/user-task.component';
import { rolGuard } from './services/rol.guard';

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: '/login'},
    {path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent, canActivate: 
    [rolGuard],data: { rol: ['programmer','admin'] }},
    {path: 'home/task/:id', component: TasksComponent},
    {path: 'new/task', component: NewTaskComponent},
    {path: 'ranking', component: RankingComponent},
    {path: 'user/task', component: UserTaskComponent},
]
