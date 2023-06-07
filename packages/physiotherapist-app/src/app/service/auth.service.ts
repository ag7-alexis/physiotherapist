import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, present } from '@physiotherapist/shared';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$ = new BehaviorSubject<User | undefined>(undefined);

  constructor(private http: HttpClient) {
    this.checkAuth();
  }

  isAuth() {
    let isAuth = false;
    this.user$
      .pipe(
        tap({
          next: (u) => (isAuth = present(u)),
        })
      )
      .subscribe();

    return isAuth;
  }

  login(user: Partial<User>): Observable<User> {
    return this.http.post<User>('/api/auth/login', user).pipe(
      tap({
        next: (user) => this.user$.next(user),
        error: () => this.user$.next(undefined),
      })
    );
  }

  register(user: Partial<User>) {
    return this.http.post<User>('/api/auth/register', user).pipe(
      tap({
        next: (user) => this.user$.next(user),
        error: () => this.user$.next(undefined),
      })
    );
  }

  checkAuth() {
    this.http
      .get<User>('/api/auth/check')
      .pipe(
        tap({
          next: (user) => this.user$.next(user),
          error: () => this.user$.next(undefined),
        })
      )
      .subscribe();
  }
}
