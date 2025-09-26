import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { TotalStudent } from '../total-student/total-student';
import { StudentService } from '../services/student.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { HttpClientModule  } from '@angular/common/http';
import Swal from 'sweetalert2';
import { NavbarFooter } from '../navbar-footer/navbar-footer';
@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [NavbarFooter,CommonModule, MatTableModule, MatButtonModule, MatIconModule ,NgxPaginationModule,FormsModule , HttpClientModule],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css'
})
export class StudentList implements OnInit{
  downloadExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.filteredStudents.map(s => ({
      Name: s.name,
      Contact: s.contact
    })));
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Students');
    XLSX.writeFile(wb, 'students.xlsx');
  }


  students: any[] = [];
  filteredStudents: any[] = [];
  studentFilter: string = '';
  studentPage: number = 1;
  loading: boolean = false;

  constructor( private dialog:MatDialog , private studentService: StudentService) { }



  ngOnInit(): void {
     this.loadStudents();
 
  }
  loadStudents() {
    this.loading = true;
    this.studentService.getStudents().subscribe({
      next: (data) => {
    
        this.students = [...data].reverse();
        this.filteredStudents = [...this.students];

      },
      error: () => {
        this.loading = false;
        Swal.fire('Error!', 'Failed to load students', 'error');
      }
    });
  }

openpopup() {
 const dialogRef = this.dialog.open(TotalStudent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog closed with result:', result);
      if (result === 'saved' || result === 'updated') {
        setTimeout(() => this.loadStudents(), 300); 
      }
    });
    this.loadStudents();
  
 
}

  applyStudentFilter() {
    this.filteredStudents = this.students.filter((s) =>
      s.name.toLowerCase().includes(this.studentFilter.toLowerCase())
    );
    this.studentPage = 1;
  }

editStudent(student: any) {
    const dialogRef = this.dialog.open(TotalStudent, {
      data: student
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'updated') {
        setTimeout(() => this.loadStudents(), 300);
      }
    });
    this.loadStudents();
  }




deleteStudent(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This student will be deleted permanently!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.studentService.deleteStudent(id).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'Student deleted successfully.', 'success');
            setTimeout(() => this.loadStudents(), 300);
          },
          error: () => Swal.fire('Error!', 'Failed to delete student', 'error')
        });
      }
    });
    this.loadStudents();
  }
}
