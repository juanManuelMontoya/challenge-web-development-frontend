import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
export class GameAutenticationService {
    
    private url : String = "https://challenge-web-development.herokuapp.com/";

    constructor(private http: HttpClient){

    }

    


    createGame(data:any): Observable<any>{
              
        return this.http.post(this.url+"crearJuego",data, {
            headers:new HttpHeaders({
                'content-type': 'application/json'
            }),
            responseType: 'text'
        });
    }
}