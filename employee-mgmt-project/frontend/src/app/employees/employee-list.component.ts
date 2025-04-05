import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  templateUrl: './employee-list.component.html',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule
  ],
})
export class EmployeeListComponent implements OnInit {
  employeeService = inject(EmployeeService);
  router = inject(Router);

  employees: any[] = [];
  filteredEmployees: any[] = [];
  searchText = '';

  displayedColumns: string[] = [
    'photo',
    'name',
    'email',
    'designation',
    'department',
    'salary',
    'actions'
  ];

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getAllEmployees().subscribe((res) => {
      this.employees = res;
      this.filteredEmployees = res;
    });
  }

  onSearch() {
    const text = this.searchText.toLowerCase();
    this.filteredEmployees = this.employees.filter((emp) =>
      emp.first_name.toLowerCase().includes(text) ||
      emp.last_name.toLowerCase().includes(text) ||
      emp.department.toLowerCase().includes(text) ||
      emp.designation.toLowerCase().includes(text)
    );
  }

  viewEmployee(id: string) {
    this.router.navigate(['/employees', id]);
  }

  editEmployee(id: string) {
    this.router.navigate(['/employees/add'], { queryParams: { id } });
  }
  

  deleteEmployee(id: string) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => this.loadEmployees(),
        error: (err) => console.error('Failed to delete employee:', err)
      });
    }
  }
  
}
