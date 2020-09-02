import { Injectable } from '@angular/core';
import{Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Tache } from 'src/app/Tache/Tache';

@Injectable({
  providedIn: 'root'
})
export class FichierService {

  constructor(private http: HttpClient) { } 

  public uploadFile(formData: FormData, tacheId): Observable<any>{
    return this.http.post("http://localhost:8080/fichier/upload/"+tacheId, formData);
  }

  /*public allfiles(): Observable<any>{
    return this.http.get("http://localhost:8080/fichier/allfiles");
  } */

  public getFile(fileId): Observable<any>{
    return this.http.get<any>("http://localhost:8080/fichier/findFileById/"+fileId);
  }
}
