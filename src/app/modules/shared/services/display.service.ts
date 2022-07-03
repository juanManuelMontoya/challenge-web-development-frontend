import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisplayService {
  private loginSubject : BehaviorSubject<boolean> = new BehaviorSubject({} as boolean);
  private registersubject : BehaviorSubject<boolean> = new BehaviorSubject({} as boolean);
  private resetPasswordSubject : BehaviorSubject<boolean> = new BehaviorSubject({} as boolean);
  public readonly login: Observable<boolean> = this.loginSubject.asObservable();
  public readonly register: Observable<boolean> = this.registersubject.asObservable();
  public readonly resetPassword: Observable<boolean> = this.resetPasswordSubject.asObservable();

  constructor() { }

  public setLoginSubject(value: boolean): void {
    this.loginSubject.next(value);
  }

  public setRegisterSubject(value: boolean): void {
    this.registersubject.next(value);
  }

  public setResetPasswordSubject(value: boolean): void {
    this.resetPasswordSubject.next(value);
  }

}
