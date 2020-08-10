import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Iphase } from '../Phase/Iphase';
import{Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhaseService {

  constructor(private http: HttpClient) { }

  public addPhase(phase){
    return this.http.post("http://localhost:8080/phase/add", phase, {'responseType': 'text' as 'json'});
  }
  public getAllPhase(): Observable <any>{
    return this.http.get<any>("http://localhost:8080/phase/allPhase")
  }

  public findById(idPhase): Observable<Iphase>{
    return this.http.get<Iphase>("http://localhost:8080/phase/find/"+ idPhase);
  }
}
