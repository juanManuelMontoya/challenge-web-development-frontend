import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
  })
export class GameAutenticationService {
    
    private url: string;

    constructor(private http: HttpClient){
        this.url = environment.game.url;
    }

    createGame(data:any): Observable<any>{
        return this.http.post(`${this.url}crearJuego`, data, {
            responseType: 'text'
        });
    }

    startGame(gameId: any): Observable<any> {
        return this.http.post(`${this.url}iniciarJuego`, gameId, {
            responseType: 'text'
        });
    }

    getScore(){
        return this.http.get(`${this.url}historialGanadores`);
    }
}