import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/pages/home/home.component';
import { RaceComponent } from './shared/pages/race/race.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule)
  },
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
    data: {
      requiresLogin: true
    }
  },
  {
    path: '**', 
    pathMatch: 'full', 
    redirectTo:'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
