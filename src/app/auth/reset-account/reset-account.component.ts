import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from "../../shared/services/authentication.service";


@Component({
  selector: 'app-reset-account',
  templateUrl: './reset-account.component.html',
  styleUrls: ['./reset-account.component.scss']
})
export class ResetAccountComponent implements OnInit {

  constructor(
    public authService: AuthenticationService,
    public rouer : Router
  ) { }

  ngOnInit(): void {
    this.authService.isLoggedIn? this.authService.router.navigate(['home']):"";
  }

  login():void{
    this.rouer.navigate(['login'])
  }

}
