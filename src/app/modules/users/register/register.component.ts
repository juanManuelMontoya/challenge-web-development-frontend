import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { DisplayService } from '../../shared/services/display.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  private myScriptElement: HTMLScriptElement;

  constructor(private authService: AuthenticationService, private router: Router, private displayService: DisplayService) { 
    this.myScriptElement = document.createElement("script");
    this.myScriptElement.src = "../../../../assets/js/main.js";
    document.body.appendChild(this.myScriptElement);
  }

  ngOnInit(): void {
    this.authService.isLoggedIn ? this.router.navigate(['game/home']): this.displayService.setBackgroundSubject(true);
  }

  SignUp(email: string, password: string) {
    this.authService.SignUp(email, password);
  }

}
