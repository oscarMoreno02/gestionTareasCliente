import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { TasksService } from './services/tasks.service';
import { BrowserModule } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,CabeceraComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers:[TasksService]
})
export class AppComponent {
  title = 'gestionTareasCliente';
}
