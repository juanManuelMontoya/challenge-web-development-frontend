import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service'
import { GameAutenticationService } from '../../services/game.service';

@Component({
  selector: 'app-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.scss']
})
export class RaceComponent implements OnInit {

  constructor( private router: Router,
    public authService: AuthenticationService,
    private service: GameAutenticationService) { }

  ngOnInit(): void {
  }

}
