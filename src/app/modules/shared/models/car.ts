import { TrackFragment } from "./trackFragment"

export class Car {
    private carId: string;
    private carTag: string;
    private driver: Map<string, string>;
    private movements: TrackFragment[];
    private position: Position;
    private lastMovement: TrackFragment;

    constructor(carId: string, carTag: string, driver: Map<string, string>, movements: TrackFragment[]) {
        this.carId = carId;
        this.carTag = carTag;
        this.driver = driver;
        this.movements = movements;
        this.position = {
            x: '0',
            y: '0',
            deg: '0'
        }
        this.lastMovement = {
            id: 0,
            metersDistance: 0,
            vwDistance: 0,
            vhDistance: 0,
            angle: 0,
            used: true
        }
    }

    public CarId(): string {
        return this.carId;
    }

    public CarTag(): string {
        return this.carTag;
    }

    public Driver(): string {
        return Object.values(this.driver)[0];
    }

    public driverById(driverId: string): string {
        return this.driver.get(driverId)!;
    }

    public Movements(): TrackFragment[] {
        return this.movements.sort((move1: TrackFragment, move2: TrackFragment) => {
            if (move1.id > move2.id) {
              return 1;
            }
      
            return -1;
          });
    }

    public xPosition(): string {
        return this.position.x;
    }

    public yPosition(): string {
        return this.position.y;
    }

    public degPosition(): string {
        return this.position.deg;
    }

    public LastMovement(): TrackFragment {
        return this.lastMovement;
    }

    public changeTrackFragmentsDistance(trackFragmentDistance: number): void {
        this.movements.forEach(trackFragment => trackFragment.metersDistance = trackFragmentDistance);
    }

    public modifyPosition(x: string, y: string, deg: string): void {
        this.position.x = x;
        this.position.y = y;
        this.position.deg = deg;
    }

    public addLastMovement(movement: TrackFragment) {
        this.lastMovement = {
            id: movement.id,
            metersDistance: movement.metersDistance,
            vwDistance: movement.vwDistance,
            vhDistance: movement.vhDistance,
            angle: movement.angle,
            used: true
        }
    }

    public setMovements(movements: TrackFragment[]) {
        this.movements = movements;
    }
}

interface Position {
    x: string,
    y: string,
    deg: string
}