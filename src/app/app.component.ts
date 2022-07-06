import { Component } from '@angular/core';
import { DisplayService } from './modules/shared/services/display.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'challenge-desarrollo-web';
  background: boolean = true;

  constructor(private displayService: DisplayService) {}

  ngOnInit() {
    this.displayService.background.subscribe(value => this.background = value);
  }

}
