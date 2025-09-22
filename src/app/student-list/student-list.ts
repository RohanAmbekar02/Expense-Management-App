import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { TotalStudent } from '../total-student/total-student';
@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css'
})
export class StudentList {

constructor( private dialog:MatDialog) { }

  openpopup(){
    this.dialog.open(TotalStudent);
  }
}
