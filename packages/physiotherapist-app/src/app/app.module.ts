import { APP_INITIALIZER, NgModule, inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
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
import { HomeComponent } from './page/home/home.component';
import { LoginComponent } from './page/login/login.component';
import { RegisterComponent } from './page/register/register.component';
import { TabBarComponent } from './components/tabBar/tab-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './service/auth.service';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { TuiLetModule } from '@taiga-ui/cdk';
import {TuiTabBarModule} from '@taiga-ui/addon-mobile';
import {
  TuiAvatarModule,
  TuiHighlightModule,
  TuiInputModule,
  TuiInputPasswordModule,
  TuiIslandModule,
  TuiProgressModule,
} from '@taiga-ui/kit';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TUI_FRENCH_LANGUAGE, TUI_LANGUAGE } from '@taiga-ui/i18n';
import { Observable, of } from 'rxjs';

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
