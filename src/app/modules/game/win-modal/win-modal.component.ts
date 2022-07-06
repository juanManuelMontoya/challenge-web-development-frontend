import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-win-modal',
  templateUrl: './win-modal.component.html',
  styleUrls: ['./win-modal.component.scss']
})
export class WinModalComponent implements OnInit {
  @Input()
  showModalBox: boolean = false;
  @Input()
  showHistory: boolean = false;
  @Input()
  players = [
    { jugadorId: 1, nombre: 'Superman', puntos: 4 }
  ];
  @Input()
  puesto1: string = "";
  @Input()
  puesto2: string = "";
  @Input()
  puesto3: string = "";

  constructor(private router: Router) { }

  ngOnInit(): void {
    // No data here
  }

  returnHome(): void {
    this.router.navigate(['game/home']);
  }

  hideHistorial(): void {
    this.showHistory = !this.showHistory ? true : false;
  }

}
