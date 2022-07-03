import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { GameAutenticationService } from 'src/app/shared/services/game.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from '@firebase/util';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss']
})
export class CreateGameComponent implements OnInit {

  raceCreated: boolean = false;
  gameForm!: FormGroup;
  gameId!: string;

  constructor(
    private router: Router,
    public authService: AuthenticationService,
    private service: GameAutenticationService,
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
        this.raceCreated = true;
        this.gameId = res;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  start() {
    let game = {
      juegoId: this.gameId
    }

    this.service.startGame(game).subscribe({
      next: (res) => {
        console.log(res);
        //this.router.navigate(['race']);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  carrera():void{
    //let id = "yyy" ;
    //this.router.navigate(['race'], { state: { id: this.gameForm.get("gameId")?.value }});
    //this.router.navigate(['/game/race' + id]);
    this.router.navigate(['game/race', {id : "yyy"}]);
  }
  

}

interface Game {
  kilometros: number;
  juegoId: string;
  jugadores: {};
}
