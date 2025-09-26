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

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private router: Router ,
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

    if (mobile === '7741068506' && password === 'Srushti123') {
      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: 'Welcome back!',
        timer: 1500,
        showConfirmButton: false
      }).then(() => {
        this.router.navigate(['/Dashboard']);
      });
      // Redirect or reset form
      this.loginForm.reset();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Invalid mobile number or password.'
      });
    }
  }
 

//   onLogin() {
//   const mobile = this.loginForm.get('mobile')?.value;
//   const password = this.loginForm.get('password')?.value;

//   if (this.loginForm.valid) {
//     if (mobile === '7741068506' && password === 'Srushti123') {
//       const snackRef = this.snackBar.open('Login Successfully ✅', 'OK', {
//         duration: 2000,
//         horizontalPosition: 'center',
//         verticalPosition: 'top',
//         panelClass: 'white-snackbar'
//       });

//       snackRef.afterDismissed().subscribe(() => {
//         this.router.navigate(['/Dashboard']); // ✅ lowercase route
//       });
//     } else {
//       const snackRef = this.snackBar.open('Login Failed ❌ Invalid credentials', 'Close', {
//         duration: 3000,
//         horizontalPosition: 'center',
//         verticalPosition: 'top',
//       });

//       snackRef.afterDismissed().subscribe(() => {
//         this.loginForm.reset(); // ✅ Reset form after snackbar closes
//       });
//     }
//   } else {
//     const snackRef = this.snackBar.open('Please fill form correctly ❌', 'Close', {
//       duration: 3000,
//       horizontalPosition: 'center',
//       verticalPosition: 'top',
//     });

//     snackRef.afterDismissed().subscribe(() => {
//       this.loginForm.reset(); // ✅ Also reset if form is invalid
//     });
//   }
// }
}
