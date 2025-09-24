import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
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
@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule ,NgxPaginationModule,FormsModule , HttpClientModule],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css'
})
export class StudentList implements OnInit{



    students: any[] = [];
  filteredStudents: any[] = [];
  studentFilter: string = '';
  studentPage: number = 1;
 loading: boolean = false;
constructor( private dialog:MatDialog , private studentService: StudentService) { }

  // openpopup(){
  //   this.dialog.open(TotalStudent);
  // }
openpopup() {
  const dialogRef = this.dialog.open(TotalStudent);

  dialogRef.afterClosed().subscribe(result => {
    if (result === 'saved' || result === 'updated') {
       this.students.unshift(result);
      this.loadStudents();   
    }
  });
}
  ngOnInit(): void {
    this.loadStudents();
  }



loadStudents() {
      this.loading = true;   
      this.studentService.getStudents().subscribe({
      next: (data) => {
      this.students = data;
      this.students.reverse();  
      this.filteredStudents = data;
      this.loading = false;   
  },
    error: () => {
      this.loading = false;
      Swal.fire("Error!", "Failed to load students", "error");
    }
  });
}
//  loadStudents() {
//     this.studentService.getStudents().subscribe(data => {
//       this.students = data;
//       this.filteredStudents = data;
//     });
//   }

    applyStudentFilter() {
    this.filteredStudents = this.students.filter(s =>
      s.name.toLowerCase().includes(this.studentFilter.toLowerCase())
    );
    this.studentPage = 1;
  }
  
 editStudent(student: any) {
   const dialogRef = this.dialog.open(TotalStudent, {
    data: student
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === 'updated') {
      this.loadStudents(); 
    }
  });
}

deleteStudent(id: string) {
  Swal.fire({
    title: 'Are you sure?',
    text: 'This student will be deleted permanently!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!'
  }).then(result => {
    if (result.isConfirmed) {
      this.studentService.deleteStudent(id).subscribe({
        next: () => {
          Swal.fire('Deleted!', 'Student deleted successfully.', 'success');
          this.loadStudents();
        },
        error: () => Swal.fire('Error!', 'Failed to delete student', 'error')
      });
    }
  });
}
}
