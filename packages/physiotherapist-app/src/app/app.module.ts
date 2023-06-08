import { APP_INITIALIZER, NgModule, inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import {
  TuiButtonModule,
  TuiDialogModule,
  TuiErrorModule,
  TuiRootModule,
  TuiSvgModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './page/home/home.component';
import { LoginComponent } from './page/login/login.component';
import { RegisterComponent } from './page/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './service/auth.service';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { TuiLetModule } from '@taiga-ui/cdk';
import {
  TuiAvatarModule,
  TuiHighlightModule,
  TuiInputModule,
  TuiInputPasswordModule,
  TuiIslandModule,
} from '@taiga-ui/kit';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TUI_FRENCH_LANGUAGE, TUI_LANGUAGE } from '@taiga-ui/i18n';
import { Observable, of } from 'rxjs';
import { AppointmentComponent } from './page/appointment/appointment.component';
import {TuiNotificationModule} from '@taiga-ui/core';
import {TuiBadgeModule} from '@taiga-ui/kit'

// function initializeAppFactory(authService: AuthService): () => Observable<any> {
//   return () => authService.checkAuth();
// }

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AppointmentComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TuiRootModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    TuiIslandModule,
    TuiInputModule,
    TuiInputPasswordModule,
    TuiTextfieldControllerModule,
    TuiButtonModule,
    TuiSvgModule,
    TuiErrorModule,
    TuiAvatarModule,
    TuiHighlightModule,
    TuiTableModule,
    TuiLetModule,
    TuiDialogModule,
    TuiNotificationModule,
    TuiBadgeModule,
  ],
  providers: [
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: initializeAppFactory,
    //   deps: [AuthService],
    //   multi: true,
    // },
    AuthService,
    {
      provide: TUI_LANGUAGE,
      useValue: of(TUI_FRENCH_LANGUAGE),
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
