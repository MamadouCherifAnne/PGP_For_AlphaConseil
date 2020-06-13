import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http'
import { Observable } from 'rxjs';
import { IProfession } from '../Profession/IProfession';

@Injectable({
  providedIn: 'root'
})
export class ProfessionService {

  constructor(private http:HttpClient) { }

  public addProfession(profession){
    return this.http.post("http://localhost:8080/profession/add",profession);
  }
  // La liste Des role
  public getProfession() : Observable<IProfession[]>{
    return this.http.get<IProfession[]>("http://localhost:8080/profession/all");
  }
}
