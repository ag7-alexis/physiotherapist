import { Injectable, signal } from '@angular/core';

import { User, present } from '@physiotherapist/shared';
import { tap } from 'rxjs';
import { AuthService } from '../../service/auth.service';

export interface UserCredential {
  emailAddress: string;
  password: string;
}

export class RegisterState {
  readonly errorMessage: string | undefined = undefined;
  constructor(
    readonly status:
      | 'none'
      | 'register-ongoing'
      | 'register-success'
      | 'register-error',
    readonly error: Error | unknown | undefined
  ) {
    if (present(error)) {
      this.errorMessage = 'Adresse email déjà utilisé';
    }
  }

  static initialize() {
    return new RegisterState('none', undefined);
  }

  registerOngoing() {
    return new RegisterState('register-ongoing', undefined);
  }

  registerSuccess() {
    return new RegisterState('register-success', undefined);
  }

  registerError(error: unknown) {
    return new RegisterState('register-error', error);
  }
}

@Injectable()
export class RegisterSandbox {
  state = signal(RegisterState.initialize());

  constructor(private authService: AuthService) {}

  register(userCredential: UserCredential): void {
    this.state.update((s) => s.registerOngoing());
    try {
      const userCandidate: Partial<User> = {
        emailAddress: userCredential.emailAddress,
        password: userCredential.password,
      };
      this.authService
        .register(userCandidate)
        .pipe(
          tap({
            next: () => this.state.update((s) => s.registerSuccess()),
            error: (e) => this.state.update((s) => s.registerError(e)),
          })
        )
        .subscribe();
    } catch (e) {
      this.state.update((s) => s.registerError(e));
    }
  }
}
