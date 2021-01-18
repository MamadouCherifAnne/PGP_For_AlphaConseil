import { Injectable } from '@angular/core';
import{Observable} from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Tache } from 'src/app/Tache/Tache';
import { AuthentificationService } from './authentification.service';
import {environment} from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FichierService {
 
  
  public host = environment.alfaApiUrl;
  entete:any ;
  jeton:string;

  constructor(private http: HttpClient,private authService:AuthentificationService) {
    // Ici on prepare le chargement du jeton d'authentification pour acceder aux 
    // Requetes a travers l'entete authorization
    this.jeton = authService.getToken();
    this.entete= new HttpHeaders({'authorization':this.jeton}) 
   } 

  public uploadFile(formData: FormData, tacheId): Observable<any>{
    return this.http.post(this.host+"/fichier/upload/"+tacheId, formData,{headers:this.entete});
  }

  /*public allfiles(): Observable<any>{
    return this.http.get("http://localhost:8080/fichier/allfiles");
  } */

  public getFile(fileId): Observable<any>{
    return this.http.get<any>(this.host+"/fichier/findFileById/"+fileId,{headers:this.entete});
  }

  public delete(fileId){
    return this.http.delete(this.host+"/fichier/deletefile/"+fileId);
  }
}
