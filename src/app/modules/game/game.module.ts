import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { HomeComponent } from './home/home.component';
import { CoreModule } from '../core/core.module';
import { CreateGameComponent } from './create-game/create-game.component';


@NgModule({
  declarations: [
    HomeComponent,
    CreateGameComponent
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    CoreModule
  ]
})
export class GameModule { }
