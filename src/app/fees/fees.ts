
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { FeesDeatils } from '../services/fees-deatils';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FeesForm } from '../fees-form/fees-form';
import Swal from 'sweetalert2';
import { NavbarFooter } from "../navbar-footer/navbar-footer";
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import 'jspdf-autotable';
@Component({
  selector: 'app-fees',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, FormsModule, NgxPaginationModule, NavbarFooter],
  templateUrl: './fees.html',
  styleUrls: ['./fees.css']
})
export class FeesComponent implements OnInit {
  fees: any[] = [];
  filteredFees: any[] = [];
  feesFilter: string = '';
  feesPage: number = 1;

  constructor(private feesservice: FeesDeatils, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadFees();
  }

  loadFees() {
    this.feesservice.getFees().subscribe(data => {
      this.fees = data.reverse(); 
      this.filteredFees = [...this.fees];
    });
  }

  applyFeesFilter() {
    this.filteredFees = this.fees.filter(f =>
      f.student?.name.toLowerCase().includes(this.feesFilter.toLowerCase()) ||
      f.courseName.toLowerCase().includes(this.feesFilter.toLowerCase())
    );
    this.feesPage = 1;
  }


 downloadExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.filteredFees.map(f => ({
      Student: f.student?.name,
      Course: f.courseName,
      Total: f.totalFees,
      Paid: f.paidFees,
      Remaining: f.remainingFees,
      Status: f.remainingFees > 0 ? 'Pursuing' : 'Completed',
      Date: (new Date(f.date)).toLocaleDateString('en-GB')
    })));
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Fees');
    XLSX.writeFile(wb, 'fees.xlsx');
  }
downloadPDF() {
  const doc = new jsPDF();

  autoTable(doc, {
    head: [['Student', 'Course', 'Total', 'Paid', 'Remaining', 'Status', 'Date']],
    body: this.filteredFees.map(f => [
      f.student?.name,
      f.courseName,
      f.totalFees,
      f.paidFees,
      f.remainingFees,
      f.remainingFees > 0 ? 'Pursuing' : 'Completed',
      (new Date(f.date)).toLocaleDateString('en-GB')
    ]),
    theme: 'grid',
    styles: { fontSize: 10 },
    // headStyles: { fillColor: [22, 160, 133] },
    headStyles: { fillColor: [115, 50, 117] } 
  });

  doc.save('fees.pdf');
}
 
addFee() {
  const dialogRef = this.dialog.open(FeesForm);

  dialogRef.afterClosed().subscribe(result => {
    if (result && result._id) {
      this.fees.unshift(result);
      this.filteredFees = [...this.fees];
      this.feesPage = 1;
      
       this.loadFees();
    }
  });
  
}

editFee(fee: any) {
  const dialogRef = this.dialog.open(FeesForm, { data: fee });

  dialogRef.afterClosed().subscribe(result => {
       if (result && result._id) {
         const idx = this.fees.findIndex(f => f._id === result._id);
      if (idx > -1) {
        this.fees[idx] = result;
      } else {
        this.fees.unshift(result);
      }
      this.filteredFees = [...this.fees];
      this.loadFees();
    }
  });
  
}

deleteFee(id: string) {
  Swal.fire({
    title: 'Are you sure?',
    text: 'This fee record will be deleted!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!'
  }).then(result => {
    if (result.isConfirmed) {
      this.feesservice.deleteFee(id).subscribe({
        next: () => {
          Swal.fire('Deleted!', 'Fee record deleted.', 'success');
       
          this.fees = this.fees.filter(f => f._id !== id);
          this.filteredFees = [...this.fees];
          this.loadFees();
        },
        error: () => Swal.fire('Error!', 'Failed to delete fee', 'error')
      });
    }
  });
  
}

}
