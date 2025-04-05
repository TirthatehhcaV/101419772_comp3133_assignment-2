import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../services/employee.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

// ✅ Import these for Material styling
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  templateUrl: './employee-detail.component.html',
  imports: [
    CommonModule,
    AsyncPipe,
    MatFormFieldModule, // ✅ required
    MatInputModule      // ✅ required
  ],
})
export class EmployeeDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private employeeService = inject(EmployeeService);

  employee$!: Observable<any>;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.employee$ = this.employeeService.getEmployeeById(id);
    }
  }
}
