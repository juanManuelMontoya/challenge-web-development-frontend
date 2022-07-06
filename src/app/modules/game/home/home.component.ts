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

  start(race: string) {
    let game = {
      juegoId: this.gameId
    }

    console.log(game);
    
    this.service.startGame(game).subscribe({
      next: (res) => {
        let data = JSON.parse(res);
        let cars: Car[] = [
          new Car(data[0].carroId, 'car1', data[0].conductor, trackFragmentCar1),
          new Car(data[1].carroId, 'car2', data[1].conductor, trackFragmentCar2),
          new Car(data[2].carroId, 'car3', data[2].conductor, trackFragmentCar3)
        ]

        this.displayService.setCarSubject(cars);
        this.router.navigate([`game/${race}`, {id : this.gameId}]);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

}
