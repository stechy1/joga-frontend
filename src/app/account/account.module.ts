import { NgModule } from '@angular/core';
import { AccountComponent } from './account.component';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { LecturesComponent } from './lectures/lectures.component';
import { PersonalComponent } from './personal/personal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ShareModule } from '../share/share.module';
import { LecturesService } from './lectures/lectures.service';

@NgModule({
  declarations: [
    AccountComponent,
    LecturesComponent,
    PersonalComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    ReactiveFormsModule,
    ShareModule
  ],
  providers: [
    LecturesService
  ]
})
export class AccountModule {

}
