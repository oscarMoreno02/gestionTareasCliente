import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckloginService } from '../services/checklogin.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [CheckloginService]
})
export class LoginComponent {
  constructor(private login: CheckloginService, private router: Router) {}

  email: string = '';
  password: string = '';

  checkLogin() {
    this.login.checkLogin(this.email, this.password).subscribe({
      next: (token: any | undefined) => {
        sessionStorage.setItem('token',token.token);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
