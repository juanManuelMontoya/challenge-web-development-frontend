import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Car } from '../../shared/models/car';
import { TrackFragment } from '../../shared/models/trackFragment';
import { DisplayService } from '../../shared/services/display.service';
import { GameService } from '../../shared/services/game.service';
import { GameSocket } from '../../shared/services/socket.service';

@Component({
  selector: 'app-race-v2',
  templateUrl: './race-v2.component.html',
  styleUrls: ['./race-v2.component.scss'],
  animations: [
    trigger('race', [
      state('move', style({
        transform: 'translateX({{ x }}vw) translateY({{ y }}vh) rotate({{ deg }}deg)'
      }), {
        params: {
          x: '30',
          y: '0',
          deg: '0'
        }
      }),
      state('notMove', style({
        transform: 'translateX({{ x }}vw) translateY({{ y }}vh) rotate({{ deg }}deg)'
      }), {
        params: {
          x: '30',
          y: '0',
          deg: '0'
        }
      }),
      transition('move => notMove', [
        animate('30s 30s')
      ])
    ])
  ]
})
export class RaceV2Component implements OnInit {

  agregateID: string;
  routestate: any;
  totalDistance!: number;
  cars: Car[] = [];

  //animation variable
  position: string = 'left'/*  */
  leftPosition: string = '13'//'1800px'
  animationTime: string = '1000ms'

  //Modal Controlers
  showModalBox: boolean = false;
  showHistory: boolean = false;

  // data example podio
  players = [
    { jugadorId: 1, nombre: 'Superman', puntos: 4 }
  ];

  puesto1: string = "";
  puesto2: string = "";
  puesto3: string = "";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: GameService,
    private socket: GameSocket,
    private displayService: DisplayService
  ) {
    localStorage.getItem('user') !== null ? this.displayService.setBackgroundSubject(false) : this.router.navigate(['login']);

    this.getHistoryData();
    this.agregateID = this.route.snapshot.params['id'];
    this.service.setUrl(this.agregateID);

  }

  ngOnInit(): void {
    this.displayService.cars.subscribe({
      next: (res) => {
        res.forEach((car) => {
          this.cars.push(car);
        });
      },
      error: (error) => {
        console.log(error);
      }
    });

    this.displayService.raceLength.subscribe({
      next: (res) => {
        this.totalDistance = res;
      },
      error: (error) => {
        console.log(error);
      }
    });

    console.log(this.cars);

    setTimeout(() => {
      this.start();
    }, 500);
  }

  getDriverByCarTag(carTag: string) {
    let car = this.cars.filter(curent => curent.CarTag() == carTag)[0];
    return car.Driver();
  }



  getXPositionByCarTag(carTag: string) {
    let car = this.cars.filter(curent => curent.CarTag() == carTag)[0];
    return car.xPosition();
  }

  start() {
    this.service.messages.subscribe({
      next: (res) => {
        console.log('Type' + res.type);
        if (res.type.includes('KilometrajeCambiado')) {
          let distance = res.distancia;
          let car = this.cars.filter(current => current.CarId() == res.aggregateRootId)[0];

          this.move(car.CarTag(), distance);
        } else if (res.type.includes('JuegoFinalizado')) {
          this.puesto1 = res.podio.primerLugar.nombre.value;
          this.puesto2 = res.podio.segundoLugar.nombre.value;
          this.puesto3 = res.podio.tercerLugar.nombre.value;

          this.modalOpen();
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  move(car: string, distance: number) {

    let currentCar = this.cars.filter(curent => curent.CarTag() == car)[0];

    this.animationTime = this.animationTime.slice(-2) == 'ms' ? '' : this.animationTime + 'ms';
    let distanceNum = parseInt(currentCar.xPosition());
    distanceNum = distance != null ? distanceNum + this.calculateDistance(distance) : distance;
    this.leftPosition = distanceNum.toString();

    currentCar.modifyPosition(distanceNum.toString(), "", "");
    this.position = 'move';
    console.log(car);
  }


  modalOpen(): void {
    this.showModalBox = !this.showModalBox ? true : false;
  }

  getHistoryData(): void {
    this.service.getScore().subscribe({
      next: (res) => {
        this.players = res.sort((a: any, b: any) => {
          if (a.puntos > b.puntos) {
            return -1;
          }
    
          return 1;
        })
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  calculateDistance(distance: number) {
    console.log((distance * 80) / this.totalDistance);

    return (distance * 80) / this.totalDistance;
  }
}
