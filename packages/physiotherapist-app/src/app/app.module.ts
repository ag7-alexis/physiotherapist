import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { TuiLetModule } from '@taiga-ui/cdk';
import {
  TuiButtonModule,
  TuiDialogModule,
  TuiErrorModule,
  TuiNotificationModule,
  TuiRootModule,
  TuiSvgModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabBarComponent } from './components/tabBar/tab-bar.component';

import { TuiTabBarModule } from '@taiga-ui/addon-mobile';
import { TUI_FRENCH_LANGUAGE, TUI_LANGUAGE } from '@taiga-ui/i18n';
import {
  TuiAvatarModule,
  TuiHighlightModule,
  TuiInputModule,
  TuiInputPasswordModule,
  TuiIslandModule,
  TuiProgressModule,
} from '@taiga-ui/kit';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { HomeComponent } from './page/home/home.component';
import { LoginComponent } from './page/login/login.component';
import { RegisterComponent } from './page/register/register.component';
import { AuthService } from './service/auth.service';
import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';

// function initializeAppFactory(authService: AuthService): () => Observable<any> {
//   return () => authService.checkAuth();
// }

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    TabBarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TuiRootModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    GoogleMapsModule,
    HttpClientJsonpModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    TuiRootModule,

    TuiTextfieldControllerModule,

    TuiLetModule,

    TuiProgressModule,
    TuiNotificationModule,
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
    TuiTabBarModule,
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
