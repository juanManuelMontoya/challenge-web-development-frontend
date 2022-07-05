import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { GameService } from '../../shared/services/game.service';
import { Car } from '../../shared/models/car';
import { trackFragmentCar1, trackFragmentCar2, trackFragmentCar3 } from '../../shared/models/trackFragment';
import { DisplayService } from '../../shared/services/display.service';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss']
})
export class CreateGameComponent implements OnInit {

  @Input()
  readyToRace: boolean = false;
  @Output() raceCreated = new EventEmitter<any>();
  gameForm!: FormGroup;

  constructor(
    private router: Router,
    public authService: AuthenticationService,
    private service: GameService,
    private formGroup: FormBuilder,
    private displayService: DisplayService
  ) {
    this.gameForm = this.formGroup.group({
      gameId: new FormControl("", [Validators.required]),
      kilometers: new FormControl(0, [Validators.required]),
      playerOneName: new FormControl("", [Validators.required]),
      playerOneIdentity: new FormControl("", [Validators.required]),
      playerTwoName: new FormControl("", [Validators.required]),
      playerTwoIdentity: new FormControl("", [Validators.required]),
      playerThreeName: new FormControl("", [Validators.required]),
      playerThreeIdentity: new FormControl("", [Validators.required]),
    });
  }

  ngOnInit(): void { 
    /* TODO document why this method 'ngOnInit' is empty */ 
  }

  create() {
    let game: Game = {
      kilometros: this.gameForm.get("kilometers")?.value,
      juegoId: this.gameForm.get("gameId")?.value,
      jugadores: {}
    };

    let jugadores = new Map();
    jugadores.set(this.gameForm.get("playerOneIdentity")?.value, this.gameForm.get("playerOneName")?.value);
    jugadores.set(this.gameForm.get("playerTwoIdentity")?.value, this.gameForm.get("playerTwoName")?.value);
    jugadores.set(this.gameForm.get("playerThreeIdentity")?.value, this.gameForm.get("playerThreeName")?.value);

    game.jugadores = Object.fromEntries(jugadores);

    this.service.createGame(game).subscribe({
      next: (res) => {
        let data = JSON.parse(res);
        let cars: Car[] = [
          new Car(data[0].carroId, 'car1', data[0].conductor[Object.keys(data[0].conductor)[0]], trackFragmentCar1),
          new Car(data[1].carroId, 'car2', data[1].conductor[Object.keys(data[1].conductor)[0]], trackFragmentCar2),
          new Car(data[2].carroId, 'car3', data[2].conductor[Object.keys(data[2].conductor)[0]], trackFragmentCar3)
        ]

        this.displayService.setCarSubject(cars);
        this.displayService.setRaceLengthSubject(game.kilometros * 1000);
        this.raceCreated.emit({isCreated: true, gameId: data[0].juegoId});
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}

interface Game {
  kilometros: number;
  juegoId: string;
  jugadores: {};
}
