import { Component, OnInit } from '@angular/core';
import { DisplayService } from '../../shared/services/display.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  forgotPassword: boolean;
  login: boolean;
  register: boolean;

  constructor(private displayService: DisplayService) {
    this.forgotPassword = false;
    this.login = true;
    this. register = false;
  }

  ngOnInit(): void {
    this.displayService.login.subscribe(value => this.login = value);
    this.displayService.register.subscribe(value => this.register = value);
    this.displayService.resetPassword.subscribe(value => this.forgotPassword = value);
  }

}