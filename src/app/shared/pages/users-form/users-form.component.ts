import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service'
import { GameAutenticationService } from '../../services/game.service';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss']
})
export class UsersFormComponent implements OnInit {

  raceCreated : boolean = false;

  constructor(
    private router:Router,
    public authService: AuthenticationService,
    private service : GameAutenticationService
  ) {
   }

  ngOnInit(): void {
  }

  create(){

    let data = { 
      "kilometros": 2,
      "juegoId":"yyy",
      "jugadores": { 
          "112233": "Juan",
          "4455443": "Pedro", 
          "fffff": "Santiago" 
      } 
  }  

    this.service.createGame(data).subscribe(res => {
      console.log(res);     
      console.log("entro");
       
    }, error => {
      console.log(data);
      console.log(error)
    });
  }

}
