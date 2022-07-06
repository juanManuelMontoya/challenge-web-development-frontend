import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RaceComponent } from './modules/game/race/race.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule)
  },
  {
    path: 'game', 
    loadChildren: () => import('./modules/game/game.module').then(m => m.GameModule)
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
