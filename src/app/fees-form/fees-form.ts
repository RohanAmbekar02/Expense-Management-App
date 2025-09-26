
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FeesDeatils } from '../services/fees-deatils';
import { StudentService } from '../services/student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fees-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './fees-form.html',
  styleUrls: ['./fees-form.css']
})
export class FeesForm implements OnInit {
  feeForm!: FormGroup;
  editMode = false;
  students: any[] = [];

  constructor(
    private fb: FormBuilder,
    private feeService: FeesDeatils,
    private studentService: StudentService,
    private dialogRef: MatDialogRef<FeesForm>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}


minDate: string = new Date().toISOString().split('T')[0];

ngOnInit(): void {
  this.feeForm = this.fb.group({
    student: ['', Validators.required],
    courseName: ['', Validators.required],
    totalFees: ['', [Validators.required, Validators.min(0)]],
    paidFees: ['', [Validators.required, Validators.min(0)]],
    remainingFees: [{value: '', disabled: true}, Validators.required],
    date: [new Date().toISOString().split('T')[0], Validators.required]
  });

  this.studentService.getStudents().subscribe(s => this.students = s);

 
  const calcRemaining = () => {
    const total = Number(this.feeForm.get('totalFees')?.value) || 0;
    const paid = Number(this.feeForm.get('paidFees')?.value) || 0;
    const rem = total - paid;
   
    this.feeForm.get('remainingFees')?.setValue(rem);
  };

  this.feeForm.get('totalFees')?.valueChanges.subscribe(calcRemaining);
  this.feeForm.get('paidFees')?.valueChanges.subscribe(calcRemaining);

  if (this.data) {
    this.editMode = true;
    
    const patched = {...this.data, date: new Date(this.data.date).toISOString().split('T')[0]};
    this.feeForm.patchValue({
      student: patched.student?._id || patched.student,
      courseName: patched.courseName,
      totalFees: patched.totalFees,
      paidFees: patched.paidFees,
      remainingFees: patched.remainingFees,
      date: patched.date
    });
  }
}




onSubmit() {
  if (this.feeForm.invalid) return;

  const raw = this.feeForm.getRawValue();

 
  const studentName = this.students.find(s => s._id === raw.student)?.name || '';

  const feeData = {
    ...raw,
    name: studentName, 
    totalFees: Number(raw.totalFees),
    paidFees: Number(raw.paidFees),
    remainingFees: Number(raw.remainingFees)
  };

  if (this.editMode && this.data._id) {
    this.feeService.updateFee(this.data._id, feeData).subscribe({
      next: (res) => {
        Swal.fire('Updated!', 'Fee updated successfully', 'success');
        this.dialogRef.close(res);
      },
      error: () => Swal.fire('Error!', 'Failed to update fee', 'error')
    });
  } else {
    this.feeService.addFee(feeData).subscribe({
      next: (res) => {
        Swal.fire('Added!', 'Fee added successfully', 'success');
        this.dialogRef.close(res);
      },
      error: () => Swal.fire('Error!', 'Failed to add fee', 'error')
    });
  }
}


  closeForm() {
    this.dialogRef.close(); 
  }
}


