import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountComponent } from './account.component';
import { LecturesComponent } from './lectures/lectures.component';
import { PersonalComponent } from './personal/personal.component';

const routes: Routes = [
  {
    path: 'my',
    component: AccountComponent,
    children: [
      {
        path: '',
        redirectTo: 'lectures',
        outlet: 'subpage'
      },
      {
        path: 'lectures',
        component: LecturesComponent,
        outlet: 'subpage'
      },
      {
        path: 'personal',
        component: PersonalComponent,
        outlet: 'subpage'
      }
    ]
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
