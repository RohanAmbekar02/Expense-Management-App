import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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

  logout() {
    console.log('User logged out');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
  

 
}
