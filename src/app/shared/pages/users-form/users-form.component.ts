import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service'

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss']
})
export class UsersFormComponent implements OnInit {

  raceCreated : boolean = false;
  constructor(
    private router:Router,
    public authService: AuthenticationService
  ) {
   }

  ngOnInit(): void {
  }

  login(){
  }

}
