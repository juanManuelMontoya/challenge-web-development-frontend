import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DisplayService } from '../../shared/services/display.service';
import { GameAutenticationService } from '../../shared/services/game.service';
import { GameSocket } from '../../shared/services/socket.service';

@Component({
  selector: 'app-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.scss']
})
export class RaceComponent implements OnInit {

  agregateID: string;
  routestate: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: GameAutenticationService,
    private socket: GameSocket,
    private displayService: DisplayService
  ) {

    /*if(this.router.getCurrentNavigation().extras.state){
      this.routestate = this.router.getCurrentNavigation().extras.state;
      this.agregateID =  this.routeState.id ? JSON.parse(this.routeState.id) : '';;
    }*/

    this.agregateID = this.route.snapshot.params['id'];
    console.log(this.agregateID);

    this.service.setUrl(this.agregateID);
    this.service.messages.subscribe({
      next: (res) => {
        console.log('Response recieved from websocket: ' + res);
      },
      error: (error) => {
        console.log(error);
      }
    });

  }

  ngOnInit(): void {
    localStorage.getItem('user') !== null ? this.displayService.setBackgroundSubject(false) : this.router.navigate(['login']);
  }

}
