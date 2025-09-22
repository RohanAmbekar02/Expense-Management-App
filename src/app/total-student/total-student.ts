import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-total-student',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './total-student.html',
  styleUrl: './total-student.css'
})
export class TotalStudent {

  studentForm: any;

  constructor(private fb: FormBuilder) {
    this.studentForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      contact: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]]
    });
  }

  onSubmit() {
    if (this.studentForm.valid) {
      console.log(this.studentForm.value);
      alert('Student Registered Successfully!');
    }
  }
  onCancel() {
  this.studentForm.reset();
}
}
