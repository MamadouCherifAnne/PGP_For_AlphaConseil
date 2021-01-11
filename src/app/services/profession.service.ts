import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule,HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { IProfession } from '../Profession/IProfession';
import { AuthentificationService } from './authentification.service';
import {environment} from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProfessionService {

  public host = environment.alfaApiUrl;
  entete:any ;
  jeton:string;

  constructor(private http: HttpClient,private authService:AuthentificationService) {
    // Ici on prepare le chargement du jeton d'authentification pour acceder aux 
    // Requetes a travers l'entete authorization
    this.jeton = authService.getToken();
    this.entete= new HttpHeaders({'authorization':this.jeton}) 
  }
  public addProfession(profession){
    return this.http.post(this.host+"/profession/add",profession,{headers:this.entete});
  }

  public updateProfession(profession, idProfession){
    return this.http.post(this.host+"/profession/update/"+idProfession,profession,{responseType:'text',headers:this.entete});
  }
  // La liste Des role
  public getProfession() : Observable<IProfession[]>{
    return this.http.get<IProfession[]>(this.host+"/profession/all",{headers:this.entete});
  }
}
