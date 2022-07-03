import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private url: string;

    constructor(private http: HttpClient){
        this.url = environment.game.url;
    }

    createGame(data:any): Observable<any>{
        return this.http.post(`${this.url}crearJuego`, data, {responseType: 'text'});
    }

    getScore(){
        return this.http.get(`${this.url}historialGanadores`);
    }
}