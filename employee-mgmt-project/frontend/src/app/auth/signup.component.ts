import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Router } from '@angular/router'; // ✅ Import RouterModule

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  imports: [
    FormsModule,
    NgIf,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule // ✅ Include RouterModule here
  ]
})
export class SignupComponent {
  username = '';
  email = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  signup() {
    this.auth.signup(this.username, this.email, this.password).subscribe({
      next: (res: any) => {
        const token = res?.data?.Signup?.token;
        if (token) {
          localStorage.setItem('token', token);
          this.router.navigate(['/employees']);
        }
      },
      error: err => {
        this.error = err.message;
      }
    });
  }
}
