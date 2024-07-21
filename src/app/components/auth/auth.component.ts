import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInput,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  protected readonly loginForm = new FormControl('login', {
    validators: [Validators.required],
    nonNullable: true,
  });

  protected login() {
    this.authService.login(this.loginForm.value);
    this.router.navigate(['products']);
  }
}
