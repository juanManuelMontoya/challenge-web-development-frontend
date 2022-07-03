import { Injectable } from "@angular/core";
import * as Rj from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameSocket{
    connected = false;
    aggregateId : string = "";
    
    constructor(){

    }
 

  private subject!: Rj.Subject<MessageEvent>;

  public connect(url:string): Rj.Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
      console.log('Successfully connected To: ' + url);
    }
    return this.subject;
  }


  private create(url:string): Rj.Subject<MessageEvent> {
    let wsc = new WebSocket(url);

    let observable = Rj.Observable.create((obs: Rj.Observer<MessageEvent>) => {
      wsc.onmessage = obs.next.bind(obs);
      wsc.onerror = obs.error.bind(obs);
      wsc.onclose = obs.complete.bind(obs);
      return wsc.close.bind(wsc);
    });
    let observer = {
      next: (data: Object) => {
        if (wsc.readyState === WebSocket.OPEN) {
          wsc.send(JSON.stringify(data));
        }
      },
    };
    return Rj.Subject.create(observer, observable);
  }

  /*init(aggregateId : string) : void {
    this.aggregateId = aggregateId;
    
    if (!this.connected) {
      var aggregateId = this.aggregateId;
      console.log("Val: " + aggregateId);
      let socket = new WebSocket("ws://https://challenge-web-development.herokuapp.com/retrieve/" + aggregateId);

      socket.onmessage = function(m) {
          console.log("Got message: " + m.data);
          //document.getElementById("result").append(m.data + "\n");
      };
    }
  }*/

}