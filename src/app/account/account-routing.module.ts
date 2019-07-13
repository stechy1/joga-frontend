import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountComponent } from './account.component';
import { AccountGuard } from './account.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AccountComponent,
    canActivate: [AccountGuard]
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
export class AccountRoutingModule {

}
