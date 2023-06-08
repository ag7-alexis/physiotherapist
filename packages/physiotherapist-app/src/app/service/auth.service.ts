import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@physiotherapist/shared';
import { BehaviorSubject, EMPTY, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$ = new BehaviorSubject<User | undefined>(undefined);

  constructor(private http: HttpClient) {
    this.checkAuth()
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
    try {
      this.http.get<User>('/api/auth/check').pipe(
        tap({
          next: (user) => this.user$.next(user),
          error: () => this.user$.next(undefined),
        })
      ).subscribe();
    } catch (e) {
      console.log({ e });
      this.user$.next(undefined);
    }
  }
}
