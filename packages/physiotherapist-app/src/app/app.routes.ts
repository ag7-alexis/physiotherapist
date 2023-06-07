import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Route,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { LoginComponent } from './page/login/login.component';
import { RegisterComponent } from './page/register/register.component';
import { inject } from '@angular/core';
import { AuthService } from './service/auth.service';
import { map, tap } from 'rxjs';
import { absent, present } from '@physiotherapist/shared';

const isAuthGuard: CanActivateFn = (
  _: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isAuth = authService.isAuth();

  return (
    isAuth ||
    router.navigate(['/login'], {
      queryParams: {
        return: state.url,
      },
    })
  );
};

const isNotAuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isNotAuth = false === authService.isAuth();

  return isNotAuth || router.navigate(['/']);
};

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [isAuthGuard],
  },

  {
    path: 'login',
    component: LoginComponent,
    canActivate: [isNotAuthGuard],
  },

  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [isNotAuthGuard],
  },
];
