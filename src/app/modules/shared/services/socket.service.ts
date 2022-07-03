import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  connected = false;
  aggregateId: string = "";
  
  constructor() {

  }

  ngOnInit(): void {
  }

  init(aggregateId: string): void {
    this.aggregateId = aggregateId;

    if (!this.connected) {
      var aggregateId = this.aggregateId;
      console.log("Val: " + aggregateId);
      let socket = new WebSocket("ws://" + location.host + "/retrieve/" + aggregateId);

      socket.onmessage = function (m) {
        console.log("Got message: " + m.data);
        //document.getElementById("result").append(m.data + "\n");
      };
    }
  }
}
