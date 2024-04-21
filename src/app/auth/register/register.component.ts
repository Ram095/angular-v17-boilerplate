import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { startLoading } from '../../store/shared/shared.action';
import { registerStart } from '../state/auth.action';
import { AuthState } from '../state/auth.state';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm!: FormGroup;
  constructor(private fb: FormBuilder, private store: Store<AuthState>) {
    this.registerForm = this.fb.group({
      email: this.fb.control('', Validators.required),
      password: this.fb.control(null, Validators.required),
    });
  }

  get emailFormControl() {
    return this.registerForm.get('email') as FormControl;
  }

  get passwordFormControl() {
    return this.registerForm.get('password') as FormControl;
  }

  register() {
    if (this.registerForm.valid) {
      const registerValue = {
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
      };
      this.store.dispatch(startLoading({ loadingState: true }));
      this.store.dispatch(registerStart(registerValue));
    }
  }
}
