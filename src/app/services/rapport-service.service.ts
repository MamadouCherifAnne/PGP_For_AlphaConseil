import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import{Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { AuthentificationService } from './authentification.service';

@Injectable({
  providedIn: 'root'
})
export class RapportServiceService {

  public entete:HttpHeaders;
  public jeton:string;

  constructor(private http: HttpClient,private authService:AuthentificationService) {
    // Ici on prepare le chargement du jeton d'authentification pour acceder aux 
    // Requetes a travers l'entete authorization
    this.jeton = authService.getToken();
    this.entete  = new HttpHeaders({'authorization':this.jeton})
  //  this.entete.append('Accept', 'application/pdf');
  }
  
 
 printInvoice(id): any {
  const httpOptions = {
   // responseType: 'arraybuffer' as 'json'
   headers: this.entete,
  responseType  : 'blob' as "json",
     
    
  };
  
  return this.http.get<any>("http://localhost:8080/rapport/export/" + id,httpOptions );

  }

  pdf(id): Observable<any> {
    let headers = new HttpHeaders({'authorization':this.jeton})
    console.log("la cle de eport pdf est"+this.jeton)
    const httpOptions = {
      headers: this.entete,
      //responseType: 'arraybuffer' as 'json'
      responseType  : 'blob' as 'json'      //This also worked
    };
    
    return this.http.get<any>("http://localhost:8080/rapport/export/" + id, httpOptions);
  }
    

  /////////////////////////////////////////
  generateDocumentReport(idProjet): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('authorization',this.jeton)
    headers.append('Accept', 'application/pdf');
    
    let requestOptions: any = { headers: headers, responseType: 'blob' };
    
    return this.http.get('https://localhost:8080/rapport/projetCoteClient/' + idProjet, requestOptions)
      .pipe(map((response)=>{
        return {
          filename: 'rapportJournalier.pdf',
          data: new Blob([response], {type: 'application/pdf'})
        };
    }));}
  ////////////////////////////////////////
 
  ////////////////////////////////////////

}
