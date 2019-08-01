import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';

import { AuthComponent } from './auth.component';
import { UserRolePipe } from './user-role.pipe';

@NgModule({
  declarations: [
    AuthComponent,
    UserRolePipe,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule
  ],
  exports: [
    UserRolePipe
  ],
  providers: []
})
export class AuthModule {

}
