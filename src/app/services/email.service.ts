import { Injectable } from '@angular/core';
import {HttpClient} from  "@angular/common/http";
import {Mail} from "../Email/email";
import {environment} from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EmailService {

 
  public host = environment.alfaApiUrl;
  constructor(private http: HttpClient) { }

  public simpleEmail(mail){
    return this.http.post(this.host+"/mail/sendMail", mail, {responseType: 'text'} );
  }
} 
