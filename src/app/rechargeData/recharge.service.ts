import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RechargeService {

  // definissons une variable qui indique l'etat de la recharge des donnees
  public isLoading:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() { }
}
