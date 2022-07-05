import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from '../../shared/models/car';
import { trackFragmentCar1, trackFragmentCar2, trackFragmentCar3 } from '../../shared/models/trackFragment';
import { DisplayService } from '../../shared/services/display.service';
import { GameService } from '../../shared/services/game.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  raceCreated: boolean = false;
  gameId!: string;

  constructor(private displayService: DisplayService, private router: Router, private service: GameService) { 
    
  }

  ngOnInit(): void {
    localStorage.getItem("user") !== null ? this.displayService.setBackgroundSubject(false) : this.router.navigate(['login']);
  }

  setRace(event: any) {
    this.raceCreated = event.isCreated;
    this.gameId = event.gameId;
  }

  start() {
    let game = {
      juegoId: this.gameId
    }

    this.service.startGame(game).subscribe({
      next: (res) => {
        this.router.navigate(['game/race', {id : res}]);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

}
