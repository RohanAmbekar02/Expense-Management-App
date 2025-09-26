import { Component } from '@angular/core';
import { RouterOutlet,Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-login',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatIconModule,RouterOutlet],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  hidePassword = true;
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    if (this.loginForm.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Required Fields!',
        text: 'Please fill all required fields correctly.'
      });
      return;
    }

    const { mobile, password } = this.loginForm.value;

    this.authService.login({ mobile, password }).subscribe({
      next: (res) => {
        // API success - JWT मिळेल
        localStorage.setItem('token', res.token);

        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'Welcome back!',
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          this.router.navigate(['/Dashboard']);
        });

        this.loginForm.reset();
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: err.error?.msg || 'Invalid mobile number or password.'
        });
      }
    });
  }
}
