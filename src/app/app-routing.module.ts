import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralComponent } from './general/general.component';

const routes: Routes = [
  {
    path: 'general',
    // loadChildren: () => import('./general/general.module').then(mod => mod.GeneralModule)
    component: GeneralComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'general'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled',
      // preloadingStrategy: ''
    })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
