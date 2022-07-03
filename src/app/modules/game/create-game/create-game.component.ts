import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { GameAutenticationService } from 'src/app/shared/services/game.service';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss']
})
export class CreateGameComponent implements OnInit {

  raceCreated: boolean = false;

  constructor(
    private router: Router,
    public authService: AuthenticationService,
    private service: GameAutenticationService
  ) {
  }

  ngOnInit(): void {}

  create() {

    let data = {
      "kilometros": 2,
      "juegoId": "yyy",
      "jugadores": {
        "112233": "Juan",
        "4455443": "Pedro",
        "fffff": "Santiago"
      }
    }

    this.service.createGame(data).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

}
