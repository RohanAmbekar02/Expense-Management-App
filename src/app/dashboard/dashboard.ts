import { Component, OnInit } from '@angular/core';
import { NavbarFooter } from '../navbar-footer/navbar-footer';
import { StudentService } from '../services/student.service';
import { FeesDeatils } from '../services/fees-deatils';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarFooter],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  totalStudents: number = 0;
  totalPaidFees: number = 0;
  completedStudents: number = 0;

  constructor(private studentService: StudentService, private feesService: FeesDeatils) {}

  ngOnInit(): void {
    this.studentService.getStudents().subscribe({
      next: (students) => {
        this.totalStudents = students.length;
      },
      error: () => {
        this.totalStudents = 0;
      }
    });
    this.feesService.getFees().subscribe({
      next: (fees) => {
        this.totalPaidFees = fees.reduce((sum, fee) => sum + (fee.paidFees || 0), 0);
        this.completedStudents = fees.filter(fee => fee.remainingFees === 0).length;
      },
      error: () => {
        this.totalPaidFees = 0;
        this.completedStudents = 0;
      }
    });
  }
}
