import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DisplayService } from '../../shared/services/display.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private displayService: DisplayService, private router: Router) { }

  ngOnInit(): void {
    localStorage.getItem("user") !== null ? this.displayService.setBackgroundSubject(false) : this.router.navigate(['login']);
  }

}
