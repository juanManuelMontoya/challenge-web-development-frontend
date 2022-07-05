import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DisplayService } from '../../shared/services/display.service';
import { GameService } from '../../shared/services/game.service';
import { GameSocket } from '../../shared/services/socket.service';

@Component({
  selector: 'app-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.scss'],
  animations:[
    trigger('car1',[
      state('car1', 
          style({
            transform:'translateX({{left}}vw)'
          }), {params: {left: '60'}}  // parameter passed in the template
      ),

      transition('left => right', [
          animate('{{time}}')  // parameter passed in the template
      ]),
      transition('* => right', [
        animate('{{time}}')  // parameter passed in the template
    ])
  ]),
  trigger('car2',[
    state('car2', 
        style({
          transform:'translateX({{left}}vw)'
        }), {params: {left: '60'}}  // parameter passed in the template
    ),

    transition('left => right', [
        animate('{{time}}')  // parameter passed in the template
    ]),
    transition('* => right', [
      animate('{{time}}')  // parameter passed in the template
    ])
  ]),
  trigger('car3',[
    state('car3', 
        style({
          transform:'translateX({{left}}vw)'
        }), {params: {left: '60'}}  // parameter passed in the template
    ),

    transition('left => right', [
        animate('{{time}}')  // parameter passed in the template
    ]),
    transition('* => right', [
      animate('{{time}}')  // parameter passed in the template
    ])
  ])
  ]
})

export class RaceComponent implements OnInit {

  agregateID: string;
  routestate: any;
  //Modal Controlers
  showModalBox : boolean = false; 
  showHistory : boolean = false;

  //animation variable
  position:string = 'left'/*  */
  leftPosition:string = '13'//'1800px'
  animationTime:string = '1000ms'
  kilometers:number = 2000;
  // data example podio
  players = [
    {jugadorId: 1, nombre:'Superman', puntos:4}
];  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: GameService,
    private socket: GameSocket,
    private displayService: DisplayService
  ) {

    this.getHistoryData();
    
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


  move(distance:string){

      this.animationTime.slice(-2) == 'ms' ? null : this.animationTime = this.animationTime + 'ms';
      let distanceNum = parseInt(this.leftPosition);
      distanceNum = distance != null ? distanceNum + this.calculateDistance(parseInt(distance)) : distance;
      this.leftPosition = distanceNum.toString() ;
      this.position = 'right';
      
  }

  modalOpen() : void {
    this.showModalBox == false ? this.showModalBox = true : this.showModalBox = false;
  }

  hideHistorial() : void {
    this.showHistory = this.showHistory == false ? true : false;
  }

  getHistoryData(): void {
    this.service.getScore().subscribe( res => this.players = res, error => console.log(error) );

    /*this.players.sort(function (x,y){
      return x.puntos > y.puntos ? 1: -1;
    });*/
  }

  calculateDistance(distance:number){
    console.log((distance*80)/this.kilometers);
    
    return (distance*80)/this.kilometers;
  }
}
