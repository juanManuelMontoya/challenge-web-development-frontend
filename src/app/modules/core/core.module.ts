import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingComponent } from './landing/landing.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    LandingComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LandingComponent,
    HeaderComponent
  ]
})
export class CoreModule { }
