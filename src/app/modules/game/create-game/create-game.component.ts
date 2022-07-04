import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { GameService } from '../../shared/services/game.service';

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
    private formGroup: FormBuilder
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
        this.raceCreated.emit({isCreated: true, gameId: res});
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
