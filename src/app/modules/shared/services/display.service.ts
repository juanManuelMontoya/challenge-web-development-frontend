import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisplayService {
  private backgroundSubject : BehaviorSubject<boolean> = new BehaviorSubject({} as boolean);
  public readonly background: Observable<boolean> = this.backgroundSubject.asObservable();

  constructor() { }

  public setBackgroundSubject(value: boolean): void {
    this.backgroundSubject.next(value);
  }

}
