import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Phase } from '../Phase/Phase';

@Injectable({
  providedIn: 'root'
})
export class PhaseService {

  constructor(private http: HttpClient) { }

  public addPhase(phase){
    return this.http.post("http://localhost:8080/phase/add", phase, {'responseType': 'text' as 'json'});
  }
  
}
