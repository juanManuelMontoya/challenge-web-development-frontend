import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Car } from '../shared/models/car';
import { HomeComponent } from './home/home.component';
import { RaceV2Component } from './race-v2/race-v2.component';
import { RaceComponent } from './race/race.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data:{
      requiresLogin: true
    }
  },
  {
    path: 'race1', 
    component: RaceComponent, 
    data : {
      id: String
    }
  },
  {
    path: 'race2',
    component: RaceV2Component,
    data : {
      id: String
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
