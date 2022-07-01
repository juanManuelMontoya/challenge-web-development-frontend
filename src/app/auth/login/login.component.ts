import { Component, OnInit } from '@angular/core';
import { AuthenticationService  } from '../../shared/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  myScriptElement : HTMLScriptElement;
 
  constructor(
    public authService: AuthenticationService
  ) { 
      this.myScriptElement = document.createElement("script");
      this.myScriptElement.src = "../../../assets/js/main.js";
      document.body.appendChild(this.myScriptElement);
  }

  ngOnInit(): void {
    this.authService.isLoggedIn? this.authService.router.navigate(['home']):"";
  }

}
