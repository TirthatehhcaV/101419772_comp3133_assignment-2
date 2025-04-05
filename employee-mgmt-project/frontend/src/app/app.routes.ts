import { Routes } from '@angular/router';

import { LoginComponent } from './auth/login.component';
import { SignupComponent } from './auth/signup.component';

import { EmployeeListComponent } from './employees/employee-list.component';
import { EmployeeFormComponent } from './employees/employee-form.component';
import { EmployeeDetailComponent } from './employees/employee-detail.component';

import { authGuard } from './auth.guard';
import { NavbarComponent } from './navbar/navbar.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  {
    path: '',
    component: NavbarComponent,
    children: [
      { path: 'employees', component: EmployeeListComponent, canActivate: [authGuard] },
      { path: 'employees/add', component: EmployeeFormComponent, canActivate: [authGuard] },
      { path: 'employees/edit/:id', component: EmployeeFormComponent, canActivate: [authGuard] },
      { path: 'employees/:id', component: EmployeeDetailComponent, canActivate: [authGuard] }
    ]
  },

  { path: '**', redirectTo: 'login' }
];
