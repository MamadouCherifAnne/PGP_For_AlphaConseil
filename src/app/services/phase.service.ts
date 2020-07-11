import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Phase } from '../Phase/Phase';
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
}
