import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Car } from '../../shared/models/car';
import { trackFragmentCar1, trackFragmentCar2, trackFragmentCar3, TrackFragment } from '../../shared/models/trackFragment';
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
        transform: 'translateX({{ x }}vw)'
      }), {
        params: {
          x: '30',
        }
      }),
      transition('* <=> move', [
        animate('2s')
      ])
    ])
  ]
})

export class RaceComponent implements OnInit {

  agregateID: string;
  routestate: any;
  totalDistance: number = 2000;
  isMoving: boolean = false;
  cars: Car[] = [
    new Car('be337f95-dbb6-4adb-9079-de56c6eccbd1', 'car1', "Felipe3", trackFragmentCar1),
    new Car('f1999cbe-573e-4694-a62d-9680aadaa784', 'car2', "Andrés3", trackFragmentCar2),
    new Car('afd3e706-7ee6-4f1a-999b-0528714d041e', 'car3', "Juan3", trackFragmentCar3)
  ];

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

    let cars = localStorage.getItem('car')

    this.getHistoryData();
    
    /*if(this.router.getCurrentNavigation().extras.state){
      this.routestate = this.router.getCurrentNavigation().extras.state;
      this.agregateID =  this.routeState.id ? JSON.parse(this.routeState.id) : '';;
    }*/

    this.agregateID = this.route.snapshot.params['id'];

    this.service.setUrl(this.agregateID);
    

  }

  ngOnInit(): void {
    let distance = this.totalDistance / 9;
    this.changeMovementsDistance(distance);
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

  start() {
    this.service.messages.subscribe({
<<<<<<< HEAD
      next: (res) => {
        console.log('Type' + res.type);
        if(res.type.includes('KilometrajeCambiado')){
          let distance = res.distance;
          let car = this.cars.filter(current => current.CarId() == res.aggregateRootId)[0];
          this.move(car.CarTag(),distance.toString());
        }else if(res.type.includes('JuegoFinalizado')){
          this.puesto1 = res.podio.primerLugar;
          this.puesto2 = res.podio.segundoLugar;
          this.puesto3 = res.podio.tercerLugar;
          this.modalOpen();
=======
      next: (msg) => {
        //console.log('Response recieved from websocket: ' + msg);
        if (msg.type.includes('KilometrajeCambiado')) {
          let distance = msg.distancia!;
          let car = this.cars.filter(current => current.CarId() == msg.aggregateRootId)[0];
          let movements: TrackFragment[] = this.createMovements(distance, car);
  
          this.move(movements, car);
>>>>>>> 642fc8ed918c52a177b97364b776806d9ba9820a
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
    /*data.forEach(msg => {
      if (msg.type.includes('KilometrajeCambiado')) {
        let distance = msg.distancia!;
        let car = this.cars.filter(current => current.CarId() == msg.aggregateRootId)[0];
        //let movements: TrackFragment[] = this.createMovements(distance, car);

        //this.moveT(movements, car);
        this.move(car.CarTag(),distance.toString());
      }
    });*/
  }

  move(car:string,distance:string){

      let currentCar = this.cars.filter(curent => curent.CarTag() == car)[0];

      this.animationTime.slice(-2) == 'ms' ? null : this.animationTime = this.animationTime + 'ms';
      let distanceNum = parseInt(this.leftPosition);
      distanceNum = distance != null ? distanceNum + this.calculateDistance(parseInt(distance)) : distance;
      this.leftPosition = distanceNum.toString() ;
      currentCar.modifyPosition(this.leftPosition,"","");
      this.position = 'move';
      console.log(car);
      
  }

  modalOpen() : void {
    this.showModalBox == false ? this.showModalBox = true : this.showModalBox = false;
  }

  hideHistorial() : void {
    this.showHistory = this.showHistory == false ? true : false;
  }

  getHistoryData(): void {
    this.service.getScore().subscribe( res => this.players = res.sort((a : any, b : any) => { 
      if(a.puntos > b.puntos){
        return -1;
      }

      return 1;
    }), error => console.log(error) );
  }

  calculateDistance(distance:number){
    console.log((distance*80)/this.kilometers);
    
    return (distance*80)/this.kilometers;
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

}

const data = [
  {
    "distancia": 600,
    "carrilId": {
      "uuid": "be7fec64-2cf9-4666-8244-763c2c1757d2"
    },
    "juegoId": {
      "uuid": "prueba3"
    },
    "when": "1656945982374",
    "uuid": "8463d3ee-759e-4755-b077-c8ca6a1ae0d6",
    "type": "carro.KilometrajeCambiado",
    "aggregateRootId": "be337f95-dbb6-4adb-9079-de56c6eccbd1",
    "aggregateParentId": "prueba3",
    "aggregate": "carro",
    "versionType": 1
  },
  {
    "distancia": 500,
    "carrilId": {
      "uuid": "6cae7dc3-bfd0-4daf-8331-75045fb3973f"
    },
    "juegoId": {
      "uuid": "prueba3"
    },
    "when": "1656945986379",
    "uuid": "cd354d69-0af1-43f8-abb0-4e13e523b7b6",
    "type": "carro.KilometrajeCambiado",
    "aggregateRootId": "f1999cbe-573e-4694-a62d-9680aadaa784",
    "aggregateParentId": "prueba3",
    "aggregate": "carro",
    "versionType": 1
  },
  {
    "distancia": 100,
    "carrilId": {
      "uuid": "131b1b0c-1bab-43ef-ba55-fabf2231cc60"
    },
    "juegoId": {
      "uuid": "prueba3"
    },
    "when": "1656945990386",
    "uuid": "8caf6af1-f8bf-4bc0-9bd4-9d5b34da9627",
    "type": "carro.KilometrajeCambiado",
    "aggregateRootId": "afd3e706-7ee6-4f1a-999b-0528714d041e",
    "aggregateParentId": "prueba3",
    "aggregate": "carro",
    "versionType": 2
  },
  {
    "distancia": 500,
    "carrilId": {
      "uuid": "be7fec64-2cf9-4666-8244-763c2c1757d2"
    },
    "juegoId": {
      "uuid": "prueba3"
    },
    "when": "1656945994390",
    "uuid": "7ae41901-6a6c-41dd-b727-7cc0d16df22d",
    "type": "carro.KilometrajeCambiado",
    "aggregateRootId": "be337f95-dbb6-4adb-9079-de56c6eccbd1",
    "aggregateParentId": "prueba3",
    "aggregate": "carro",
    "versionType": 2
  },
  {
    "distancia": 400,
    "carrilId": {
      "uuid": "6cae7dc3-bfd0-4daf-8331-75045fb3973f"
    },
    "juegoId": {
      "uuid": "prueba3"
    },
    "when": "1656945998396",
    "uuid": "fcea7956-dd4d-4cb5-884f-bc4aa23bb060",
    "type": "carro.KilometrajeCambiado",
    "aggregateRootId": "f1999cbe-573e-4694-a62d-9680aadaa784",
    "aggregateParentId": "prueba3",
    "aggregate": "carro",
    "versionType": 2
  },
  {
    "distancia": 200,
    "carrilId": {
      "uuid": "131b1b0c-1bab-43ef-ba55-fabf2231cc60"
    },
    "juegoId": {
      "uuid": "prueba3"
    },
    "when": "1656946002407",
    "uuid": "96228c7f-4fba-4c7b-834f-a29ab941d219",
    "type": "carro.KilometrajeCambiado",
    "aggregateRootId": "afd3e706-7ee6-4f1a-999b-0528714d041e",
    "aggregateParentId": "prueba3",
    "aggregate": "carro",
    "versionType": 3
  },
  {
    "distancia": 500,
    "carrilId": {
      "uuid": "be7fec64-2cf9-4666-8244-763c2c1757d2"
    },
    "juegoId": {
      "uuid": "prueba3"
    },
    "when": "1656946006419",
    "uuid": "e9ac5c6b-cb6a-44a0-bb01-dbe9203f9ae6",
    "type": "carro.KilometrajeCambiado",
    "aggregateRootId": "be337f95-dbb6-4adb-9079-de56c6eccbd1",
    "aggregateParentId": "prueba3",
    "aggregate": "carro",
    "versionType": 3
  },
  {
    "distancia": 100,
    "carrilId": {
      "uuid": "6cae7dc3-bfd0-4daf-8331-75045fb3973f"
    },
    "juegoId": {
      "uuid": "prueba3"
    },
    "when": "1656946010424",
    "uuid": "75098059-0347-42ea-b4d1-8bbf2fba605d",
    "type": "carro.KilometrajeCambiado",
    "aggregateRootId": "f1999cbe-573e-4694-a62d-9680aadaa784",
    "aggregateParentId": "prueba3",
    "aggregate": "carro",
    "versionType": 3
  },
  {
    "distancia": 300,
    "carrilId": {
      "uuid": "131b1b0c-1bab-43ef-ba55-fabf2231cc60"
    },
    "juegoId": {
      "uuid": "prueba3"
    },
    "when": "1656946014434",
    "uuid": "7aab12ec-2dd3-45f7-be69-70261ecf7b61",
    "type": "carro.KilometrajeCambiado",
    "aggregateRootId": "afd3e706-7ee6-4f1a-999b-0528714d041e",
    "aggregateParentId": "prueba3",
    "aggregate": "carro",
    "versionType": 4
  },
  {
    "distancia": 200,
    "carrilId": {
      "uuid": "be7fec64-2cf9-4666-8244-763c2c1757d2"
    },
    "juegoId": {
      "uuid": "prueba3"
    },
    "when": "1656946018439",
    "uuid": "a1f92172-815d-47bb-b2d9-fe755b5482e5",
    "type": "carro.KilometrajeCambiado",
    "aggregateRootId": "be337f95-dbb6-4adb-9079-de56c6eccbd1",
    "aggregateParentId": "prueba3",
    "aggregate": "carro",
    "versionType": 4
  },
  {
    "distancia": 200,
    "carrilId": {
      "uuid": "6cae7dc3-bfd0-4daf-8331-75045fb3973f"
    },
    "juegoId": {
      "uuid": "prueba3"
    },
    "when": "1656946022444",
    "uuid": "9d5e258f-69da-44f7-a1de-79591e665ef7",
    "type": "carro.KilometrajeCambiado",
    "aggregateRootId": "f1999cbe-573e-4694-a62d-9680aadaa784",
    "aggregateParentId": "prueba3",
    "aggregate": "carro",
    "versionType": 4
  },
  {
    "distancia": 100,
    "carrilId": {
      "uuid": "131b1b0c-1bab-43ef-ba55-fabf2231cc60"
    },
    "juegoId": {
      "uuid": "prueba3"
    },
    "when": "1656946026452",
    "uuid": "65736dc5-bb04-47e6-a121-8d74b47ef40e",
    "type": "carro.KilometrajeCambiado",
    "aggregateRootId": "afd3e706-7ee6-4f1a-999b-0528714d041e",
    "aggregateParentId": "prueba3",
    "aggregate": "carro",
    "versionType": 5
  },
  {
    "distancia": 300,
    "carrilId": {
      "uuid": "be7fec64-2cf9-4666-8244-763c2c1757d2"
    },
    "juegoId": {
      "uuid": "prueba3"
    },
    "when": "1656946030457",
    "uuid": "30851fc5-3e95-4838-bd99-f8311adb2890",
    "type": "carro.KilometrajeCambiado",
    "aggregateRootId": "be337f95-dbb6-4adb-9079-de56c6eccbd1",
    "aggregateParentId": "prueba3",
    "aggregate": "carro",
    "versionType": 5
  },
  {
    "carroId": {
      "uuid": "be337f95-dbb6-4adb-9079-de56c6eccbd1"
    },
    "juegoId": {
      "uuid": "prueba3"
    },
    "when": "1656946030577",
    "uuid": "25253dac-8f5e-46eb-ae61-b05048d5f4f7",
    "type": "carril.CarroFinalizoSuRecorrido",
    "aggregateRootId": "be7fec64-2cf9-4666-8244-763c2c1757d2",
    "aggregateParentId": "prueba3",
    "aggregate": "carril",
    "versionType": 1
  },
  {
    "distancia": 300,
    "carrilId": {
      "uuid": "6cae7dc3-bfd0-4daf-8331-75045fb3973f"
    },
    "juegoId": {
      "uuid": "prueba3"
    },
    "when": "1656946034462",
    "uuid": "4e39ba56-8476-4a0e-843a-08d2eef7c88a",
    "type": "carro.KilometrajeCambiado",
    "aggregateRootId": "f1999cbe-573e-4694-a62d-9680aadaa784",
    "aggregateParentId": "prueba3",
    "aggregate": "carro",
    "versionType": 5
  },
  {
    "distancia": 100,
    "carrilId": {
      "uuid": "131b1b0c-1bab-43ef-ba55-fabf2231cc60"
    },
    "juegoId": {
      "uuid": "prueba3"
    },
    "when": "1656946038469",
    "uuid": "f15c7028-5ada-483e-a815-c0a3d9826cda",
    "type": "carro.KilometrajeCambiado",
    "aggregateRootId": "afd3e706-7ee6-4f1a-999b-0528714d041e",
    "aggregateParentId": "prueba3",
    "aggregate": "carro",
    "versionType": 6
  },
  {
    "distancia": 500,
    "carrilId": {
      "uuid": "be7fec64-2cf9-4666-8244-763c2c1757d2"
    },
    "juegoId": {
      "uuid": "prueba3"
    },
    "when": "1656946042475",
    "uuid": "557a0038-bda6-40c3-89aa-5bf9e4d9b50f",
    "type": "carro.KilometrajeCambiado",
    "aggregateRootId": "be337f95-dbb6-4adb-9079-de56c6eccbd1",
    "aggregateParentId": "prueba3",
    "aggregate": "carro",
    "versionType": 6
  },
  {
    "distancia": 300,
    "carrilId": {
      "uuid": "6cae7dc3-bfd0-4daf-8331-75045fb3973f"
    },
    "juegoId": {
      "uuid": "prueba3"
    },
    "when": "1656946046480",
    "uuid": "ab86c8ca-3feb-45b5-8f6f-513e70baa7b8",
    "type": "carro.KilometrajeCambiado",
    "aggregateRootId": "f1999cbe-573e-4694-a62d-9680aadaa784",
    "aggregateParentId": "prueba3",
    "aggregate": "carro",
    "versionType": 6
  },
  {
    "distancia": 400,
    "carrilId": {
      "uuid": "131b1b0c-1bab-43ef-ba55-fabf2231cc60"
    },
    "juegoId": {
      "uuid": "prueba3"
    },
    "when": "1656946050488",
    "uuid": "4c5a3e65-e088-4b30-af79-7205fc502146",
    "type": "carro.KilometrajeCambiado",
    "aggregateRootId": "afd3e706-7ee6-4f1a-999b-0528714d041e",
    "aggregateParentId": "prueba3",
    "aggregate": "carro",
    "versionType": 7
  },
  {
    "distancia": 500,
    "carrilId": {
      "uuid": "be7fec64-2cf9-4666-8244-763c2c1757d2"
    },
    "juegoId": {
      "uuid": "prueba3"
    },
    "when": "1656946054493",
    "uuid": "3d604fbf-62a5-448b-96b3-443b514c721c",
    "type": "carro.KilometrajeCambiado",
    "aggregateRootId": "be337f95-dbb6-4adb-9079-de56c6eccbd1",
    "aggregateParentId": "prueba3",
    "aggregate": "carro",
    "versionType": 7
  },
  {
    "distancia": 100,
    "carrilId": {
      "uuid": "6cae7dc3-bfd0-4daf-8331-75045fb3973f"
    },
    "juegoId": {
      "uuid": "prueba3"
    },
    "when": "1656946058498",
    "uuid": "5153f701-70d7-4f81-9a95-ad0d471a7e03",
    "type": "carro.KilometrajeCambiado",
    "aggregateRootId": "f1999cbe-573e-4694-a62d-9680aadaa784",
    "aggregateParentId": "prueba3",
    "aggregate": "carro",
    "versionType": 7
  },
  {
    "distancia": 100,
    "carrilId": {
      "uuid": "131b1b0c-1bab-43ef-ba55-fabf2231cc60"
    },
    "juegoId": {
      "uuid": "prueba3"
    },
    "when": "1656946062506",
    "uuid": "8be0ec7f-6472-41bc-999c-eaee2a191ed7",
    "type": "carro.KilometrajeCambiado",
    "aggregateRootId": "afd3e706-7ee6-4f1a-999b-0528714d041e",
    "aggregateParentId": "prueba3",
    "aggregate": "carro",
    "versionType": 8
  },
  {
    "distancia": 300,
    "carrilId": {
      "uuid": "be7fec64-2cf9-4666-8244-763c2c1757d2"
    },
    "juegoId": {
      "uuid": "prueba3"
    },
    "when": "1656946066511",
    "uuid": "58fa0040-bfeb-4c68-bef4-0a50bddbd319",
    "type": "carro.KilometrajeCambiado",
    "aggregateRootId": "be337f95-dbb6-4adb-9079-de56c6eccbd1",
    "aggregateParentId": "prueba3",
    "aggregate": "carro",
    "versionType": 8
  },
  {
    "distancia": 500,
    "carrilId": {
      "uuid": "6cae7dc3-bfd0-4daf-8331-75045fb3973f"
    },
    "juegoId": {
      "uuid": "prueba3"
    },
    "when": "1656946070517",
    "uuid": "13842e85-9378-40c5-8933-60b265da3d11",
    "type": "carro.KilometrajeCambiado",
    "aggregateRootId": "f1999cbe-573e-4694-a62d-9680aadaa784",
    "aggregateParentId": "prueba3",
    "aggregate": "carro",
    "versionType": 8
  },
  {
    "carroId": {
      "uuid": "f1999cbe-573e-4694-a62d-9680aadaa784"
    },
    "juegoId": {
      "uuid": "prueba3"
    },
    "when": "1656946070636",
    "uuid": "35fb9ba5-4ec1-4fa9-9edf-332bb4dde0ed",
    "type": "carril.CarroFinalizoSuRecorrido",
    "aggregateRootId": "6cae7dc3-bfd0-4daf-8331-75045fb3973f",
    "aggregateParentId": "prueba3",
    "aggregate": "carril",
    "versionType": 1
  },
  {
    "distancia": 600,
    "carrilId": {
      "uuid": "131b1b0c-1bab-43ef-ba55-fabf2231cc60"
    },
    "juegoId": {
      "uuid": "prueba3"
    },
    "when": "1656946074525",
    "uuid": "fb1c3867-07b1-47f3-990d-d0be9dd8d61b",
    "type": "carro.KilometrajeCambiado",
    "aggregateRootId": "afd3e706-7ee6-4f1a-999b-0528714d041e",
    "aggregateParentId": "prueba3",
    "aggregate": "carro",
    "versionType": 9
  },
  {
    "carroId": {
      "uuid": "afd3e706-7ee6-4f1a-999b-0528714d041e"
    },
    "juegoId": {
      "uuid": "prueba3"
    },
    "when": "1656946074644",
    "uuid": "bef02d53-3f11-46ba-9db6-f165ad34d034",
    "type": "carril.CarroFinalizoSuRecorrido",
    "aggregateRootId": "131b1b0c-1bab-43ef-ba55-fabf2231cc60",
    "aggregateParentId": "prueba3",
    "aggregate": "carril",
    "versionType": 1
  },
  {
    "distancia": 600,
    "carrilId": {
      "uuid": "be7fec64-2cf9-4666-8244-763c2c1757d2"
    },
    "juegoId": {
      "uuid": "prueba3"
    },
    "when": "1656946078530",
    "uuid": "48e9b4ab-34d1-4b70-8625-221a2a39a644",
    "type": "carro.KilometrajeCambiado",
    "aggregateRootId": "be337f95-dbb6-4adb-9079-de56c6eccbd1",
    "aggregateParentId": "prueba3",
    "aggregate": "carro",
    "versionType": 9
  },
  {
    "distancia": 100,
    "carrilId": {
      "uuid": "6cae7dc3-bfd0-4daf-8331-75045fb3973f"
    },
    "juegoId": {
      "uuid": "prueba3"
    },
    "when": "1656946082535",
    "uuid": "8ad0b244-c9bb-42db-967d-7ba67b18b6d3",
    "type": "carro.KilometrajeCambiado",
    "aggregateRootId": "f1999cbe-573e-4694-a62d-9680aadaa784",
    "aggregateParentId": "prueba3",
    "aggregate": "carro",
    "versionType": 9
  },
  {
    "when": "1656945978239",
    "uuid": "bbcb53c5-e73b-4848-855a-40d36350c24e",
    "type": "juego.JuegoIniciado",
    "aggregateRootId": "prueba3",
    "aggregateParentId": null,
    "aggregate": "juego",
    "versionType": 1
  },
  {
    "jugadorId": {
      "uuid": "2343"
    },
    "when": "1656946030711",
    "uuid": "50730308-8def-47a6-933e-89d921da503e",
    "type": "juego.PrimerLugarAsignado",
    "aggregateRootId": "prueba3",
    "aggregateParentId": null,
    "aggregate": "juego",
    "versionType": 1
  },
  {
    "jugadorId": {
      "uuid": "3453"
    },
    "when": "1656946070772",
    "uuid": "f19372eb-ff69-4809-9370-2de033144e89",
    "type": "juego.SegundoLugarAsignado",
    "aggregateRootId": "prueba3",
    "aggregateParentId": null,
    "aggregate": "juego",
    "versionType": 1
  },
  {
    "jugadorId": {
      "uuid": "1233"
    },
    "when": "1656946074778",
    "uuid": "9c93cdea-3ace-47ef-a5e8-764d6d2c1b3f",
    "type": "juego.TercerLugarAsignado",
    "aggregateRootId": "prueba3",
    "aggregateParentId": null,
    "aggregate": "juego",
    "versionType": 1
  },
  {
    "podio": {
      "primerLugar": {
        "nombre": {
          "value": "Felipe3"
        },
        "color": {
          "value": "#FF0000"
        },
        "puntos": 0,
        "entityId": {
          "uuid": "2343"
        }
      },
      "segundoLugar": {
        "nombre": {
          "value": "Andrés3"
        },
        "color": {
          "value": "#00FFFF"
        },
        "puntos": 0,
        "entityId": {
          "uuid": "3453"
        }
      },
      "tercerLugar": {
        "nombre": {
          "value": "Juan3"
        },
        "color": {
          "value": "#000000"
        },
        "puntos": 0,
        "entityId": {
          "uuid": "1233"
        }
      }
    },
    "when": "1656946074778",
    "uuid": "fb48c8e4-f43f-4193-958f-d33b7459648b",
    "type": "juego.JuegoFinalizado",
    "aggregateRootId": "prueba3",
    "aggregateParentId": null,
    "aggregate": "juego",
    "versionType": 1
  }
];
