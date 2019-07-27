import { NgModule } from '@angular/core';
import { NoPreloading, RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './admin/admin.guard';
import { AccountGuard } from './account/account.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./general/general.module').then(mod => mod.GeneralModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then(mod => mod.AccountModule),
    canLoad: [AccountGuard],
    canActivate: [AccountGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule),
    canLoad: [AdminGuard],
    canActivate: [AdminGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled',
      preloadingStrategy: NoPreloading
    })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
