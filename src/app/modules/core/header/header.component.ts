import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../shared/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loggedUser : string = "";

  constructor(
    private router:Router,
    private authService: AuthenticationService
  ) {

    if ( JSON.parse(localStorage.getItem('user')!) != null) {
      this.loggedUser = JSON.parse(localStorage.getItem('user')!).email;
      this.loggedUser = this.loggedUser.split('@')[0];
    }
   }

  ngOnInit(): void {
    if (this.loggedUser === "") {
      this.router.navigate(['login']);
    }
  }

  signOut() {
    this.authService.SignOut();
  }

  isLogged() {
    return this.authService.isLoggedIn;
  }

}
