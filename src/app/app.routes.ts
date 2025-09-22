import { Routes } from '@angular/router';
import { StudentList } from './student-list/student-list';
import { Dashboard } from './dashboard/dashboard';
import { Fees } from './fees/fees';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
// import { TotalStudent } from './total-student/total-student';


export const routes: Routes = [
    {
        path: 'fees',
        component: Fees
    },
     {
        path: '',
        component: Dashboard
    },
    {
        path: 'Dashboard',
        component: Dashboard
    },
    {
        path: 'students',
        component: StudentList
    },
    //  {
    //     path: 'TotalStudent',
    //     component: TotalStudent
    // }
];



