import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Car } from '../models/car';

@Injectable({
  providedIn: 'root'
})
export class DisplayService {
  private backgroundSubject : BehaviorSubject<boolean> = new BehaviorSubject({} as boolean);
  private carSubject: BehaviorSubject<Car[]> = new BehaviorSubject([] as Car[]);
  public readonly background: Observable<boolean> = this.backgroundSubject.asObservable();
  public readonly cars: Observable<Car[]> = this.carSubject.asObservable();

  constructor() { }

  public setBackgroundSubject(value: boolean): void {
    this.backgroundSubject.next(value);
  }

  public setCarSubject(value: Car[]): void {
    this.carSubject.next(value);
  }

}
