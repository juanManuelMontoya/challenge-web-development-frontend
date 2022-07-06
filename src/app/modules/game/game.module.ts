import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { HomeComponent } from './home/home.component';
import { CoreModule } from '../core/core.module';
import { CreateGameComponent } from './create-game/create-game.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RaceComponent } from './race/race.component';
import { RaceV2Component } from './race-v2/race-v2.component';
import { WinModalComponent } from './win-modal/win-modal.component'

@NgModule({
  declarations: [
    HomeComponent,
    CreateGameComponent,
    RaceComponent,
    RaceV2Component,
    WinModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GameRoutingModule,
    CoreModule
  ]
})
export class GameModule { }
