import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DisplayService } from '../../shared/services/display.service';
import { GameService } from '../../shared/services/game.service';
import { GameSocket } from '../../shared/services/socket.service';

@Component({
  selector: 'app-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.scss'],
  animations:[
    trigger('position',[
      state('left', 
          style({
              //left: '32vw',
              transform:'translateX({{left}}vw) translateY({{ejey}}vh) rotate({{rotate}}deg)',
          }), {params: {left: '250px', ejey:'0', rotate:'0'}}
      ),
      state('right', 
          style({
              //left:'{{left}}',
              transform:'translateX({{left}}vw) translateY({{ejey}}vh) rotate({{rotate}}deg)',
          }), {params: {left: '250px', ejey:'0', rotate:'0'}} // parameter passed in the template
      ),
      transition('right => left', [
          animate('{{time}}')  // parameter passed in the template
      ])
  ])
  ]
})

export class RaceComponent implements OnInit {

  agregateID: string;
  routestate: any;
  position:string = 'left'
  leftPosition:string = '32vw'
  animationTime:string = '1000ms'
  ejeyMove :string = '0';
  rotateMove : string = '0deg';
  //Modal Controlers
  showModalBox : boolean = false; 
  showHistory : boolean = false;

  players = [
    {jugadorId: 1, nombre:'Superman', puntos:4},
    {jugadorId: 2, nombre:'Batman', puntos:3},
    {jugadorId: 5, nombre:'BatGirl', puntos:2},
    {jugadorId: 3, nombre:'Robin', puntos:4},
    {jugadorId: 4, nombre:'Flash', puntos:5}
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

  move(position:string, distance:string, rotate:string, ejey:string){
      console.log(position + " " + distance);
      
      this.animationTime.slice(-2) == 'ms' ? null : this.animationTime = this.animationTime + 'ms'
      this.leftPosition = distance;
      ejey != null ? this.ejeyMove = ejey : '0';
      this.position = position;
      rotate != null ? this.rotateMove = rotate : this.rotateMove = '0';
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
}
