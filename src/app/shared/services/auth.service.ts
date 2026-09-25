import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface IAuthState {
  accessToken: string | null;
  tokenType: string | null;
  expiresIn: number | null;
}

export const AUTH_DEFAULT_VALUE: IAuthState = {
  accessToken: null,
  tokenType: null,
  expiresIn: null,
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _http = inject(HttpClient);

  private readonly _authSubject = new BehaviorSubject<IAuthState>({
    ...AUTH_DEFAULT_VALUE,
  });

  public getValueAsync<K extends keyof IAuthState>(
    key: K
  ): Observable<IAuthState[K]> {
    return this._authSubject.asObservable().pipe(map(state => state[key]));
  }

  getValue<K extends keyof IAuthState>(key: K): IAuthState[K] {
    return this._authSubject.getValue()[key];
  }

  login$(email: string, password: string) {
    return this._http
      .post<IAuthState>('http://localhost:3000/api/v1/auth', {
        email,
        password,
      })
      .pipe(tap(auth => this._authSubject.next(auth)));
  }

  logout$() {
    return this._http
      .post('http://localhost:3000/api/v1/auth/logout', {})
      .pipe(tap(() => this._authSubject.next(AUTH_DEFAULT_VALUE)));
  }
}
