import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './auth.component';

import { AuthGuard } from './auth.guard';
import { RegisterComponent } from './register/register.component';
import { RecoverComponent } from './recover/recover.component';
import { CheckCodeComponent } from './check-code/check-code.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'recover',
    component: RecoverComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'check-code',
    component: CheckCodeComponent
  },
  {
    path: 'check-code/:code',
    component: CheckCodeComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule {

}
