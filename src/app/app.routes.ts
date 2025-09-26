import { Routes } from '@angular/router';
import { StudentList } from './student-list/student-list';
import { Dashboard } from './dashboard/dashboard';
import { FeesComponent as Fees } from './fees/fees';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { Login } from './login/login';
import { authguardGuard } from './authguard-guard';



export const routes: Routes = [
    {
        path: 'fees',
        component: Fees,
        canActivate: [authguardGuard]

    },

     {
        path: '',
        component: Login
    },
    {
        path: 'login',
        component: Login
        
    },
    {
        path: 'Dashboard',
        component: Dashboard,
         canActivate: [authguardGuard]
          
    },
    {
        path: 'students',
        component: StudentList,
             canActivate: [authguardGuard]
    },
    //  {
    //     path: 'TotalStudent',
    //     component: TotalStudent
    // }
];



