import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../shared/services/authentication.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    public authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.authService.isLoggedIn? this.authService.router.navigate(['home']):"";
  }

}
