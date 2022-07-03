import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../shared/services/authentication.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  private myScriptElement: HTMLScriptElement;

  constructor(private authService: AuthenticationService) { 
    this.myScriptElement = document.createElement("script");
    this.myScriptElement.src = "../../../../assets/js/main.js";
    document.body.appendChild(this.myScriptElement);
  }

  ngOnInit(): void {
  }

  forgotPassword(email: string) {
    this.authService.ForgotPassword(email);
  }

}
