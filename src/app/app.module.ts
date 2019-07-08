import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Third party modules
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Application modules
import { GeneralModule } from './general/general.module';

// Application components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,

    // Root routing module
    AppRoutingModule,
    // Application modules
    GeneralModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
