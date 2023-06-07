import { Injectable, signal } from '@angular/core';
import { User, present } from '@physiotherapist/shared';
import { AuthService } from '../../service/auth.service';
import { tap } from 'rxjs';

export interface UserCredential {
  emailAddress: string;
  password: string;
}

export class LoginState {
  readonly errorMessage: string | undefined = undefined;
  constructor(
    readonly status: 'none' | 'login-ongoing' | 'login-success' | 'login-error',
    readonly error: Error | unknown | undefined
  ) {
    if (present(error)) {
      this.errorMessage = 'Erreur lors de la tentative de connexion';
    }
  }

  static initialize() {
    return new LoginState('none', undefined);
  }

  loginOngoing() {
    return new LoginState('login-ongoing', undefined);
  }

  loginSuccess() {
    return new LoginState('login-success', undefined);
  }

  loginError(error: unknown) {
    return new LoginState('login-error', error);
  }
}

@Injectable()
export class LoginSandbox {
  state = signal(LoginState.initialize());

  constructor(private readonly authService: AuthService) {}

  async login(userCredential: UserCredential): Promise<void> {
    this.state.update((s) => s.loginOngoing());
    try {
      const userCandidate: Partial<User> = {
        emailAddress: userCredential.emailAddress,
        password: userCredential.password,
      };
      this.authService
        .login(userCandidate)
        .pipe(
          tap({
            next: () => this.state.update((s) => s.loginSuccess()),
            error: (e) => this.state.update((s) => s.loginError(e)),
          })
        )
        .subscribe();
    } catch (e) {
      this.state.update((s) => s.loginError(e));
    }
  }
}
