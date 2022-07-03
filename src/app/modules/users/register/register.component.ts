import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../shared/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  private myScriptElement: HTMLScriptElement;

  constructor(private authService: AuthenticationService) { 
    this.myScriptElement = document.createElement("script");
    this.myScriptElement.src = "../../../../assets/js/main.js";
    document.body.appendChild(this.myScriptElement);
  }

  ngOnInit(): void {
  }

  SignUp(email: string, password: string) {
    this.authService.SignUp(email, password);
  }

}
