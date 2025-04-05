import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select'; // ✅ Added
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  templateUrl: './employee-form.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgIf,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule, // ✅ Added
    RouterModule
  ]
})
export class EmployeeFormComponent implements OnInit {
  fb = inject(FormBuilder);
  employeeService = inject(EmployeeService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  formError: string = '';

  employeeForm!: FormGroup;
  employeeId: string | null = null;
  isEdit = false;
  imagePreview = '';

  genderOptions = ['Male', 'Female', 'Other']; // ✅ Gender options

  get isEditMode() {
    return this.isEdit;
  }

  ngOnInit() {
    this.employeeForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      designation: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(1000)]],
      date_of_joining: ['', Validators.required],
      department: ['', Validators.required],
      employee_photo: ['', Validators.required],
    });

    this.route.queryParamMap.subscribe((params) => {
      this.employeeId = params.get('id');
      if (this.employeeId) {
        this.isEdit = true;
        this.loadEmployee(this.employeeId);
      }
    });

    this.employeeForm.get('employee_photo')?.valueChanges.subscribe((url) => {
      this.imagePreview = url;
    });
  }

  loadEmployee(id: string) {
    this.employeeService.getEmployeeById(id).subscribe((employee) => {
      if (employee) {
        this.employeeForm.patchValue(employee);
        this.imagePreview = employee.employee_photo;
      }
    });
  }

  onSubmit() {
    this.formError = ''; // reset error
  
    if (this.employeeForm.invalid) return;
  
    const empData = this.employeeForm.value;
  
    if (this.isEdit && this.employeeId) {
      this.employeeService.updateEmployee({ id: this.employeeId, ...empData }).subscribe({
        next: () => this.router.navigate(['/employees']),
        error: (err) => {
          console.error('Update failed:', err);
          this.formError = err?.message || 'Something went wrong during update.';
        }
      });
    } else {
      this.employeeService.addEmployee(empData).subscribe({
        next: () => this.router.navigate(['/employees']),
        error: (err) => {
          console.error('Add failed:', err);
          this.formError = err?.message || 'Something went wrong during add.';
        }
      });
    }
  }
  
}
