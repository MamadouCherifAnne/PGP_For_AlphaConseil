import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TacheService {

  constructor(private http: HttpClient) { }

  ajoutTache(tache){
    return this.http.post("http://localhost:8080/tache/add",tache,{responseType:'text'});
  }
}
