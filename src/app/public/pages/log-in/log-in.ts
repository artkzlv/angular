import { ButtonComponent } from '../../../shared/components/button/button.component';
import { InputComponent } from '../../../shared/components/input/input';
import { PasswordInputComponent } from '../../../shared/components/password-input/password-input';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth';
import { catchError, of, take, tap } from 'rxjs';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  Validators,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-log-in',
  imports: [
    ButtonComponent,
    InputComponent,
    PasswordInputComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './log-in.html',
  styleUrl: './log-in.scss',
})
export class LogInComponent {
  private _authService = inject(AuthService);
  private _router = inject(Router);
  private _destroyRef = inject(DestroyRef);

  form = new FormGroup({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
  });

  error: string | null = null;
  isLoginDisabled = signal(true);

  constructor() {
    this.form.statusChanges
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(() => {
        this.isLoginDisabled.set(this.form.invalid);
      });
  }

  onLoginClick(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { username, password } = this.form.getRawValue();

    this._authService
      .login$(username, password)
      .pipe(
        take(1),
        tap(() => this._router.navigate(['private'])),
        catchError(err => {
          this.error = 'Неверный логин или пароль';
          return of(err);
        })
      )
      .subscribe();
  }
}
