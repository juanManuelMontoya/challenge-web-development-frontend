import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GameAutenticationService } from '../../../shared/services/game.service';
import { GameService } from '../../shared/services/game.service';
import { GameSocket } from '../../shared/services/socket.service';

@Component({
  selector: 'app-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.scss']
})
export class RaceComponent implements OnInit {

  agregateID : string;
  routestate : any;
  constructor( 
    private router: Router,
    private route: ActivatedRoute,
    private service: GameService,
    private socket : GameSocket
    ) {

      /*if(this.router.getCurrentNavigation().extras.state){
        this.routestate = this.router.getCurrentNavigation().extras.state;
        this.agregateID =  this.routeState.id ? JSON.parse(this.routeState.id) : '';;
      }*/

      this.agregateID =  this.route.snapshot.params['id'];
      console.log(this.agregateID);

      this.service.setUrl(this.agregateID);
      service.messages.subscribe((msg) => {
        console.log('Response recieved from websocket: ' + msg);
      },error => {
        console.log(error);
        
      });
      
  }
  ngOnInit(): void {
  }

}
