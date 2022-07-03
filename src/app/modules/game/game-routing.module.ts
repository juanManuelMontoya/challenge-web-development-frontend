import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
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
    path: 'race', 
    component: RaceComponent, 
    data : {}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
