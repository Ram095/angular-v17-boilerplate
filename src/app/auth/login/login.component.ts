import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginFormModel: any = {
    email: '',
    password: '',
  };
  constructor(public authService: AuthService, private router: Router) {}

  login() {
    this.authService.login().subscribe(() => {
      if (this.authService.isLoggedIn) {
        const navigationExtras: NavigationExtras = {
          queryParamsHandling: 'preserve',
          preserveFragment: true,
        };
        this.router.navigate(['/admin'], navigationExtras);
      }
    });
  }
}
