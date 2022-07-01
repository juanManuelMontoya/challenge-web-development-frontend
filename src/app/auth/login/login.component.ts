import { Component, OnInit } from '@angular/core';
import { AuthenticationService  } from '../../shared/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    public authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.authService.isLoggedIn? this.authService.router.navigate(['home']):"";
  }

}
