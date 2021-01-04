import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Iphase } from '../Phase/Iphase';
import{Observable} from 'rxjs';
import { AuthentificationService } from './authentification.service';
import {environment} from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PhaseService {

  public host = environment.alfaApiUrl;
  entete:any ;
  jeton:string;

  constructor(private http: HttpClient,private authService:AuthentificationService) {
    // Ici on prepare le chargement du jeton d'authentification pour acceder aux 
    // Requetes a travers l'entete authorization
    this.jeton = authService.getToken();
    this.entete= new HttpHeaders({'authorization':this.jeton}) 
  }
  public addPhase(phase){
    return this.http.post(this.host+"/phase/add", phase, {'responseType': 'text' as 'json',headers:this.entete});
  }
  public getAllPhase(): Observable <any>{
    return this.http.get<any>(this.host+"/phase/allPhase",{headers:this.entete})
  }

  public findById(idPhase): Observable<Iphase>{
    return this.http.get<Iphase>(this.host+"/phase/find/"+ idPhase,{headers:this.entete});
  }

  public deletePhase(idPhase){
    return this.http.delete(this.host+"/phase/delete/"+idPhase);
  }

  public getProjetOfPhase (idPhase){
    return this.http.get(this.host+"/phase/getProjet/"+idPhase);
  }
}
