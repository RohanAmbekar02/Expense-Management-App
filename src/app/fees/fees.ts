
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { FeesDeatils } from '../services/fees-deatils';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-fees',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule,FormsModule,NgxPaginationModule],
  templateUrl: './fees.html',
  styleUrls: ['./fees.css']
})
export class FeesComponent implements OnInit {
  fees: any[] = [];
  filteredFees: any[] = [];
  feesFilter: string = '';
  feesPage: number = 1;

  constructor(private feesservice: FeesDeatils) {}  
  ngOnInit(): void {
    this.loadFees();
  }

  loadFees() {
    this.feesservice.getFees().subscribe(data => {
      this.fees = data;
      this.filteredFees = data;
    });
  }

   applyFeesFilter() {
    this.filteredFees = this.fees.filter(f =>
      f.student?.name.toLowerCase().includes(this.feesFilter.toLowerCase()) ||
      f.courseName.toLowerCase().includes(this.feesFilter.toLowerCase())
    );
    this.feesPage = 1;
  }

    deleteFee(id: string) {
    this.feesservice.deleteFee(id).subscribe(() => this.loadFees());
  }

  editFee(fee: any) {
    console.log('Edit Fee', fee);

  }
 
}

