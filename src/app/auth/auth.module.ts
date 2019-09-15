import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';

import { AuthComponent } from './auth.component';
import { UserRolePipe } from './user-role.pipe';
import { RegisterComponent } from './register/register.component';
import { RecoverComponent } from './recover/recover.component';
import { CheckCodeComponent } from './check-code/check-code.component';

@NgModule({
  declarations: [
    AuthComponent,
    UserRolePipe,
    RegisterComponent,
    RecoverComponent,
    CheckCodeComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    UserRolePipe
  ],
  providers: []
})
export class AuthModule {

}
