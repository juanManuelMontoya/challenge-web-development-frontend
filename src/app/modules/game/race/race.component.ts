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
      transition('move <=> *', [
        animate('2s')
      ])
    ])
  ]
})

export class RaceComponent implements OnInit {

  agregateID: string;
  routestate: any;
  totalDistance!: number;
  cars: Car[] = [];

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
        let distance = this.totalDistance / 9;
        this.changeMovementsDistance(distance);
      },
      error: (error) => {
        console.log(error);
      }
    });

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
      next: (msg) => {
        if (msg.type.includes('KilometrajeCambiado')) {
          let distance = msg.distancia!;
          let car = this.cars.filter(current => current.CarId() == msg.aggregateRootId)[0];
          let movements: TrackFragment[] = this.createMovements(distance, car);

          this.move(movements, car);
        } else if (msg.type.includes('JuegoFinalizado')) {
          this.puesto1 = msg.podio.primerLugar.nombre.value;
          this.puesto2 = msg.podio.segundoLugar.nombre.value;
          this.puesto3 = msg.podio.tercerLugar.nombre.value;

          this.modalOpen();
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  public createMovements(distance: number, car: Car) {
    let carMovements = car.Movements();
    let movements = [];
    let newMovement: TrackFragment;
    let newCarMovements: TrackFragment[] = [];
    let incrementMoveId = false;

    for (const movement of carMovements) {
      if (incrementMoveId) {
        let updateMovement = {
          id: movement.id + 1,
          metersDistance: movement.metersDistance,
          vwDistance: movement.vwDistance,
          vhDistance: movement.vhDistance,
          angle: movement.angle,
          used: false
        }

        newCarMovements.push(updateMovement);
      }

      if (distance >= movement.metersDistance && !movement.used) {
        distance -= movement.metersDistance;
        movement.used = true;
        movements.push(movement);

        car.addLastMovement(movement);
        newCarMovements.push(movement);
      } else if (!movement.used && distance > 0) {
        newMovement = this.partialMove(movement, car, distance);
        movements.push(newMovement);
        newCarMovements.push(newMovement);

        let updateMovement = {
          id: movement.id + 1,
          metersDistance: Math.abs(movement.metersDistance - distance),
          vwDistance: movement.vwDistance,
          vhDistance: movement.vhDistance,
          angle: movement.angle,
          used: false
        }

        newCarMovements.push(updateMovement);
        incrementMoveId = true;
        distance = 0;
      }
    }

    car.setMovements(newCarMovements);
    return movements;
  }

  public partialMove(movement: TrackFragment, car: Car, distance: number) {
    let lastMovement: TrackFragment = car.LastMovement();
    let moveX = false;

    if ((movement.angle == 0 || movement.angle == -180 || movement.angle == -360) &&
      lastMovement.vwDistance !== movement.vwDistance) {
      moveX = true;
    }

    let newMovement: TrackFragment = {
      id: movement.id,
      metersDistance: distance,
      vwDistance: (moveX) ? (distance * movement.vwDistance) / movement.metersDistance : movement.vwDistance,
      vhDistance: (!moveX) ? (distance * movement.vhDistance) / movement.metersDistance : movement.vhDistance,
      angle: movement.angle,
      used: true
    };

    return newMovement;
  }

  public move(movements: TrackFragment[], car: Car) {
    movements.forEach(movement => {
      if (movement.angle != 0) {
        car.modifyPosition(car.xPosition(), car.yPosition(), movement.angle.toString());
        car.modifyPosition(movement.vwDistance.toString(), movement.vhDistance.toString(), car.degPosition());
      } else {
        car.modifyPosition(movement.vwDistance.toString(), movement.vhDistance.toString(), movement.angle.toString());
      }
    });
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
}