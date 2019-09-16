import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Third party modules
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocalStorageModule } from 'angular-2-local-storage';

// Application components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavigationComponent } from './navigation/navigation.component';

import { AuthInterceptor } from './auth/auth.interceptor';
import {ShareModule} from './share/share.module';
import { UserInterceptor } from './auth/user.interceptor';
import { AccountGuard } from './account/account.guard';
import { AdminGuard } from './admin/admin.guard';
import { ResponseInterceptor } from './share/response.interceptor';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,

    // Third party modules
    LocalStorageModule.forRoot(),
    ToastrModule.forRoot(),

    // Root routing module
    AppRoutingModule,
    ShareModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UserInterceptor,
      multi: true
    },
    AccountGuard,
    AdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
