import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TacheService } from 'src/app/services/tache.service';
import { ActivatedRoute } from '@angular/router';
import { UtilisateurAffectation } from 'src/app/Utilisateur/UtilisateurAffectation';
import {jsPDF}  from "jspdf";
import  * as html2pdf from 'html2pdf.js'

@Component({
  selector: 'app-facture-tache',
  templateUrl: './facture-tache.component.html',
  styleUrls: ['./facture-tache.component.scss']
})
export class FactureTacheComponent implements OnInit {
  idTache:number;
  depenses:any=[];
  totalCoutRessource:number = 0;
  totalDepense:number =0;
  currentTache:any;
  affectations:any;

  // le viewChild du Dom html a imprimer
  @ViewChild('htmlFacture',{static:false}) htmlFacture:ElementRef
  constructor(private tacheService:TacheService, private route:ActivatedRoute) { }

  ngOnInit() {
    // Recuperer la tache concerne 
    this.idTache = parseInt(this.route.snapshot.paramMap.get('idTache'));
     this.tacheService.getTache(this.idTache).subscribe(data=>{
       if(data){
       this.currentTache = data;


       // Appel de la methode de calcul du cout total de la facture et des information de la tache
       this.tacheService.getAffectationOfTaskFormat(this.idTache).subscribe(affect=>{
         if(affect){
           this.affectations=affect;
           for(let afect of this.affectations){
              this.totalCoutRessource = this.totalCoutRessource +(afect.affectation.tempsEffectuer*afect.affectation.coutParHeure)
           }
           
         }

       });
       // 
       this.tacheService.getTaskDepenses(this.idTache).subscribe(depense=>{
         if(depense){
            this.depenses =depense;
            for(let dep of this.depenses){
              this.totalDepense = this.totalDepense +dep.coutDepense;
           }
         }

       });
     }
     });

  }

  // les Fonctions pour l'Affcihage et L'impression de la facture

  // Visualiser le pdf
 
  // Open pdf avec HTML2PDF
  public imprimerFacturePDF(){
    const options = {
      name: 'factureTache.pdf',
      image :{type:'jpeg'},
      html2canvas:{},
      jsPDF:{orientation:'landscape'}
    }

    const element: Element = document.getElementById('htmlFacture')

    // Appel de la librairies pour la sauvegarde
    html2pdf()
      .from(element)
      .set(options)
      .save()
  }

  public calculCoutFacture(coutHeure,tmpsRealiser):number{
    console.log("Le cout / heure"+coutHeure)
    return coutHeure*tmpsRealiser;
  }

 
  public get getCurrentDate():Date{
    return new Date();
  }
 
  }
