import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudentService } from '../services/student.service';
import Swal from 'sweetalert2';
import { Student } from '../services/student.model';
import { HttpClientModule  } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Inject } from '@angular/core';
@Component({
  selector: 'app-total-student',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule ],
  templateUrl: './total-student.html',
  styleUrl: './total-student.css'
})
export class TotalStudent {
  students: Student[] = [];
  filteredStudents: Student[] = [];
  studentForm!: FormGroup;
  studentPage: number = 1;
  studentFilter: string = '';
  editMode: boolean = false;
  editId: string = '';

  constructor(private fb: FormBuilder, private studentService: StudentService, private router : Router ,private dialogRef: MatDialogRef<TotalStudent>,
     @Inject(MAT_DIALOG_DATA) public data: Student | null
  ) {}

  ngOnInit(): void {
    this.loadStudents();
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      contact: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });
     if (this.data) {
    this.studentForm.patchValue({
      name: this.data.name,
      contact: this.data.contact
    });
    this.editMode = true;
    this.editId = this.data._id!;
  }
  }

  loadStudents() {
    this.studentService.getStudents().subscribe(data => {
      this.students = data;
      this.filteredStudents = data;
    });
  }

  applyStudentFilter() {
    this.filteredStudents = this.students.filter(s =>
      s.name.toLowerCase().includes(this.studentFilter.toLowerCase()) ||
      s.contact.includes(this.studentFilter)
    );
  }

  
onSubmit() {
  if (this.studentForm.invalid) return;

  const studentData = this.studentForm.value;

  if (this.editMode) {
    this.studentService.updateStudent(this.editId, studentData).subscribe({
      next: () => {
        Swal.fire('Updated!', 'Student updated successfully!', 'success');
        this.dialogRef.close('updated');  
        this.studentForm.reset();
        this.editMode = false;
      },
      error: () => Swal.fire('Error!', 'Failed to update student', 'error')
    });
  } else {
    this.studentService.addStudent(studentData).subscribe({
      next: () => {
        Swal.fire('Added!', 'Student added successfully!', 'success');
        this.dialogRef.close('saved');   
        this.studentForm.reset();
      },
      error: () => Swal.fire('Error!', 'Failed to add student', 'error')
    });
  }
}

closeForm() {
  const formContainer = document.querySelector('.form-container') as HTMLElement;
  this.router.navigate(['/student-list']);
  if (formContainer) {
    formContainer.style.display = 'none';
      
  }
}


  editStudent(student: Student) {
    this.studentForm.patchValue(student);
    this.editMode = true;
    this.editId = student._id!;
  }

  deleteStudent(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this!',
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