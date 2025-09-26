import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar-footer',
  imports: [RouterLink, FormsModule, CommonModule, RouterOutlet],
  templateUrl: './navbar-footer.html',
  styleUrl: './navbar-footer.css'
})
export class NavbarFooter {
protected readonly title = signal('Expense-Management');

constructor(private router:Router){}

  activeTab: string = 'home';
   setActive(tab: string) {
    this.activeTab = tab;
  }

 isLoggedIn = true;       
  userName = 'Thinkify Software';   

  // logout() {
  //   console.log('User logged out');
  //   this.isLoggedIn = false;
  //   this.router.navigate(['/login']);
  // }

  logout() {
  Swal.fire({
    title: 'Are you sure?',
    text: 'Do you really want to logout?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, Logout',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
    
      console.log('User logged out');
      this.isLoggedIn = false;
      this.router.navigate(['/login']);

      Swal.fire({
        title: 'Logged Out!',
        text: 'You have been logged out successfully.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });
    }
  });
}
  

 
}
