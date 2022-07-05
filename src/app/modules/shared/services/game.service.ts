import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GameSocket } from './socket.service';

export interface Message {
  user: string;
  messageContent: string;
}

@Injectable({
  providedIn: 'root'
})

export class GameService {
    private url: string;

    public messages!: Subject<any>;
    socket_url : string = "wss://challenge-web-development.herokuapp.com/retrieve/";

    constructor(private http: HttpClient, private socket:GameSocket){
        this.url = environment.game.url;
    }

    createGame(data:any): Observable<any>{
        return this.http.post(`${this.url}crearJuego`, data, {responseType: 'text'});
    }

    startGame(data: any): Observable<any> {
      return this.http.post(`${this.url}iniciarJuego`, data, {responseType: 'text'});
    }

    getScore():Observable<any>{
        return this.http.get(`${this.url}historialGanadores`);
    }

    initSocket() : void {      
      this.messages =<Subject<Message>>(
        this.socket.connect(this.socket_url).pipe(map((response : MessageEvent): any =>{
          console.log(JSON.parse(response.data));
          return JSON.parse(response.data);
        }))
      );
    }

    setUrl(aggregateId : string): void {
      this.socket_url += aggregateId;
      this.initSocket();
    }
}


