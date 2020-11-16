import { Injectable } from '@angular/core';
import {HttpClient} from  "@angular/common/http";
import {Mail} from "../Email/email";

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  public simpleEmail(mail){
    return this.http.post("http://localhost:8080/mail/sendMail", mail, {responseType: 'text'} );
  }
} 
