import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralComponent } from './general.component';

const routes: Routes = [
  {
    path: ':section',
    component: GeneralComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'general/dashboard'
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
export class GeneralRoutingModule {

}
