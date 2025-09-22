import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule, CommonModule,],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Expense-Management');

  activeTab: string = 'home';
   setActive(tab: string) {
    this.activeTab = tab;
  }

 isLoggedIn = true;       
  userName = 'Thinkify Software';   

  logout() {
    console.log('User logged out');
    this.isLoggedIn = false;
  }
  

 
}
