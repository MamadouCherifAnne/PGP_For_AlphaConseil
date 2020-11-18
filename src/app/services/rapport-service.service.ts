import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import{Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RapportServiceService {

  constructor(private http: HttpClient) { }
  
 
 printInvoice(id): any {
  const httpOptions = {
   // responseType: 'arraybuffer' as 'json'
     responseType  : 'blob' as "json"
  };
  
  return this.http.get<any>("http://localhost:8080/rapport/export/" + id, httpOptions);

  }

  pdf(id): any {
    const httpOptions = {
      //responseType: 'arraybuffer' as 'json'
      responseType  : 'blob' as 'json'      //This also worked
    };
    
    return this.http.get<any>("http://localhost:8080/rapport/export/" + id, httpOptions);
  }

  /////////////////////////////////////////
  generateDocumentReport(idProjet): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/pdf');
    let requestOptions: any = { headers: headers, responseType: 'blob' };
    
    return this.http.get('https://localhost:8080/rapport/projetCoteClient/' + idProjet, requestOptions)
      .pipe(map((response)=>{
        return {
          filename: 'dailyOrdersReport.pdf',
          data: new Blob([response], {type: 'application/pdf'})
        };
    }));}
  ////////////////////////////////////////
 
  ////////////////////////////////////////

}
