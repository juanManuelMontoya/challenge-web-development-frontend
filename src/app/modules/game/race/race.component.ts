import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Car } from '../../shared/models/car';
import { TrackFragment } from '../../shared/models/trackFragment';
import { DisplayService } from '../../shared/services/display.service';
import { GameService } from '../../shared/services/game.service';
import { GameSocket } from '../../shared/services/socket.service';

@Component({
  selector: 'app-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.scss'],
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

export class RaceComponent implements OnInit {

  agregateID: string;
  routestate: any;
  totalDistance!: number;
  isMoving: boolean = false;
  cars: Car[] = [];

  //animation variable
  position:string = 'left'/*  */
  leftPosition:string = '13'//'1800px'
  animationTime:string = '1000ms'

  //Modal Controlers
  showModalBox : boolean = false; 
  showHistory : boolean = false;

  // data example podio
  players = [
    {jugadorId: 1, nombre:'Superman', puntos:4}
  ];  

  puesto1 :string = "";
  puesto2 :string = "";
  puesto3 :string = "";

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
        let distance = this.totalDistance / 9;
        this.changeMovementsDistance(distance);
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

  changeMovementsDistance(distance: number) {
    this.cars.forEach(car => car.changeTrackFragmentsDistance(distance));
  }

  getXPositionByCarTag(carTag: string) {
    let car = this.cars.filter(curent => curent.CarTag() == carTag)[0];
    return car.xPosition();
  }

  getYPositionByCarTag(carTag: string) {
    let car = this.cars.filter(curent => curent.CarTag() == carTag)[0];
    return car.yPosition();
  }

  getDegPositionByCarTag(carTag: string) {
    let car = this.cars.filter(curent => curent.CarTag() == carTag)[0];
    return car.degPosition();
  }

  start() {
    this.service.messages.subscribe({
      next: (res) => {
        console.log('Type' + res.type);
        if(res.type.includes('KilometrajeCambiado')){
          let distance = res.distancia;
          console.log(res.distancia);
          
          let car = this.cars.filter(current => current.CarId() == res.aggregateRootId)[0];
          this.move(car.CarTag(),distance);
        }else if(res.type.includes('JuegoFinalizado')){

          
          this.puesto1 = res.podio.primerLugar.nombre.value; //let playerId = res.podio.primerLugar.jugadorId.uuid;  this.cars.filter(x => x.driverById(playerId) != null).map(x => x.driverById(playerId))[0];
          
           
          this.puesto2 = res.podio.segundoLugar.nombre.value; // playerId = res.podio.segundoLugar.jugadorId.uuid;this.cars.filter(x => x.driverById(playerId) != null).map(x => x.driverById(playerId))[0];;
          
          
          this.puesto3 =  res.podio.tercerLugar.nombre.value; // playerId = res.podio.tercerLugar.jugadorId.uuid;  this.cars.filter(x => x.driverById(playerId) != null).map(x => x.driverById(playerId))[0];;
          this.modalOpen();
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  move(car:string,distance:number){

      let currentCar = this.cars.filter(curent => curent.CarTag() == car)[0];

      this.animationTime.slice(-2) == 'ms' ? null : this.animationTime = this.animationTime + 'ms';
      let distanceNum = parseInt(currentCar.xPosition())//parseInt(this.leftPosition);
      distanceNum = distance != null ? distanceNum + this.calculateDistance(distance) : distance;
      this.leftPosition = distanceNum.toString();
      //console.log("distancia que pasa al transform : " + distanceNum.toString());
      
      currentCar.modifyPosition(distanceNum.toString(),"","");
      this.position = 'move';
      console.log(car);
  }


  modalOpen() : void {
    this.showModalBox == false ? this.showModalBox = true : this.showModalBox = false;
  }

  hideHistorial() : void {
    this.showHistory = this.showHistory == false ? true : false;
  }

  returnHome():void {
    this.router.navigate(['game/home']);
  }

  getHistoryData(): void {
    this.service.getScore().subscribe( res => this.players = res.sort((a : any, b : any) => { 
      if(a.puntos > b.puntos){
        return -1;
      }

      return 1;
    }), error => console.log(error) );
  }

  public createMovements(distance: number, car: Car) {
    let carMovements = car.Movements();
    let movements = [];
    let lastMovement;

    for (const movement of carMovements) {
      if (movement.metersDistance < distance) {
        movements.push(movement);
        distance -= movement.metersDistance;
        lastMovement = movement;

      } else if ((movement.metersDistance >= distance && distance > 0)) {
        lastMovement = {
          id: movement.id,
          metersDistance: distance,
          vwDistance: lastMovement?.vwDistance !== movement.vwDistance ? distance * movement.vwDistance / movement.metersDistance : movement.vwDistance,
          vhDistance: lastMovement?.vhDistance !== movement.vhDistance ? distance * movement.vhDistance / movement.metersDistance : movement.vhDistance,
          angle: movement.angle
        };

        movements.push(lastMovement);
        break;
      }

      car.deleteMovement();
    }

    return movements;
  }

  public moveT(movements: TrackFragment[], car: Car) {
    movements.forEach(movement => {
      if (movement.angle != 0) {
        setTimeout(() => {
          this.isMoving = true;
          car.modifyPosition(movement.vwDistance.toString(), movement.vhDistance.toString(), car.degPosition());
        }, 500);
        setTimeout(() => {
          this.isMoving = false;
          car.modifyPosition(car.xPosition(), car.yPosition(), car.degPosition());
        }, 500)
        setTimeout(() => {
          this.isMoving = true;
          car.modifyPosition(car.xPosition(), car.yPosition(), movement.angle.toString());
        }, 500);
      } else {
        setTimeout(() => {
          this.isMoving = true;
          car.modifyPosition(movement.vwDistance.toString(), movement.vhDistance.toString(), movement.angle.toString());
        }, 500);
      }
      setTimeout(() => {
        this.isMoving = false;
        car.modifyPosition(car.xPosition(), car.yPosition(), car.degPosition());
      }, 500);
    });
  }

  calculateDistance(distance:number){
    console.log((distance*80)/this.totalDistance);
    
    return (distance*80)/this.totalDistance;
  }
}