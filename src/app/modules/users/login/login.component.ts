import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../shared/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private myScriptElement: HTMLScriptElement;

  constructor(private authService: AuthenticationService) { 
    this.myScriptElement = document.createElement("script");
    this.myScriptElement.src = "../../../../assets/js/main.js";
    document.body.appendChild(this.myScriptElement);
  }

  ngOnInit(): void {}

  SignIn(userName: string, password: string) {
    this.authService.SignIn(userName, password);
  }

  Auth() {
    this.authService.GoogleAuth();
  }

}
