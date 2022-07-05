import { TrackFragment } from "./trackFragment"

export class Car {
    private carId: string;
    private carTag: string;
    private driver: string;
    private movements: TrackFragment[];
    private position: Position;

    constructor(carId: string, carTag: string, driver: string, movements: TrackFragment[]) {
        this.carId = carId;
        this.carTag = carTag;
        this.driver = driver;
        this.movements = movements;
        this.position = {
            x: '0',
            y: '0',
            deg: '0'
        }
    }

    public CarId(): string {
        return this.carId;
    }

    public CarTag(): string {
        return this.carTag;
    }

    public Driver(): string {
        return this.driver;
    }

    public Movements(): TrackFragment[] {
        return this.movements;
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

    public changeTrackFragmentsDistance(trackFragmentDistance: number): void {
        this.movements.forEach(trackFragment => trackFragment.metersDistance = trackFragmentDistance);
    }

    public modifyPosition(x: string, y: string, deg: string): void {
        this.position.x = x;
        this.position.y = y;
        this.position.deg = deg;
    }

    public deleteMovement() {
        this.movements.shift();
    }
}

interface Position {
    x: string,
    y: string,
    deg: string
}