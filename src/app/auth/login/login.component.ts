import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { startLoading } from '../../store/shared/shared.action';
import { AuthService } from '../auth.service';
import { loginStart } from '../state/auth.action';
import { AuthState } from '../state/auth.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;
  constructor(
    public authService: AuthService,
    private router: Router,
    private store: Store<AuthState>,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: this.fb.control(null, Validators.required),
      password: this.fb.control(null, Validators.required),
    });
  }

  get emailFormControl() {
    return this.loginForm.get('email') as FormControl;
  }

  get passwordFormControl() {
    return this.loginForm.get('password') as FormControl;
  }

  login() {
    if (this.loginForm.valid) {
      const loginValue = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };
      this.store.dispatch(startLoading({ loadingState: true }));
      this.store.dispatch(loginStart(loginValue));
      // this.authService
      //   .login(loginValue.email, loginValue.password)
      //   .subscribe(() => {
      //     if (this.authService.isLoggedIn) {
      //       const navigationExtras: NavigationExtras = {
      //         queryParamsHandling: 'preserve',
      //         preserveFragment: true,
      //       };
      //       this.router.navigate(['/admin'], navigationExtras);
      //     }
      //   });
    }
  }
}
