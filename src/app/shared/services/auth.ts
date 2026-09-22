import { Injectable } from '@angular/core';
import { delay, mergeMap, Observable, of, tap, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public isAuthenticated = true;

  login$(username: string, password: string): Observable<boolean> {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(username);
    const isPasswordValid = password.trim().length > 0;
    const isAuthenticated = isEmailValid && isPasswordValid;

    return of(isAuthenticated).pipe(
      delay(100),
      tap(v => (this.isAuthenticated = v)),
      mergeMap(v =>
        v ? of(v) : throwError(() => new Error('User login failed'))
      )
    );
  }

  logout$(): Observable<boolean> {
    this.isAuthenticated = false;
    return of(this.isAuthenticated).pipe(delay(100));
  }
}
