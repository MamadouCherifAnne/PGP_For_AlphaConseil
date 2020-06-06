import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  constructor(private http: HttpClient) { }

  public add(projet){
    return this.http.post("http://localhost:8080/projet/add", projet, {'responseType': 'text'});
  }

}
