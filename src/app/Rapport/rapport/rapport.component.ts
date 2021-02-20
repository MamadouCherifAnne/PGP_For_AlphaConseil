import { Component,ViewChild, ElementRef, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ProjetService} from 'src/app/services/projet.service';

import html2canvas from 'html2canvas';
import  jsPDF  from 'jspdf';
import  jspdf  from 'jspdf';
import  * as html2pdf from 'html2pdf.js';
//import * as jsPDF from 'jspdf'
import * as pdfMake from "pdfmake/build/pdfmake";

import * as pdfFonts from "pdfmake/build/vfs_fonts";

@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
  styleUrls: ['./rapport.component.scss']
})
export class RapportComponent implements OnInit {
 

  projetId: any;
  projet : any;
  allphase: any;

 
 // @ViewChild('htmlData',{static:false}) htmlData:ElementRef;
  constructor(private route: ActivatedRoute, private projetService: ProjetService) { }

  ngOnInit() {
    this.projetId =  parseInt(this.route.snapshot.paramMap.get('idProjet'));
    console.log("wsh"+this.projetId);

    let valeur = this.projetService.getById(this.projetId);
    valeur.subscribe((data)=>{
      if(data){
        this.projet=data;
      }
    });


    this.projetService.AllphaseDeProjet(this.projetId).subscribe(data=>{
      if(data){
        this.allphase = data;
      }
     });

 } 


 

  // Open pdf avec HTML2PDF
  
    
  //////////////////////////////////////////
  convertToPdf() {
    //WORKING EXAMPLE IS HERE
    let html1 = document.querySelector('.printformClass');
    html2canvas(document.querySelector(".printformClass")).then(canvas => {

      var pdf = new jsPDF('p', 'pt', [canvas.width, canvas.height]);

      var imgData = canvas.toDataURL("image/jpeg", 1.0);
      pdf.addImage(imgData, 0, 0, canvas.width, canvas.height);
      pdf.save('converteddoc.pdf');
});



  }

    
 /////////////////////////////////////////////

 public imprimerFacturePDF(){
  const options = {
    filename: 'factureTache.pdf',
    /*image :{type:'jpeg'},*/
    html2canvas:{
      dpi: 192,
      letterRendering: true, 
      allowTaint: true, 
      useCORS: true, 
      logging: false, 
      scrollX: 0,
      scrollY: 0 
    },
    jsPDF:{orientation:'portrait',
    unit: 'cm',
    format: 'a4'
    }
  }

  const element: Element = document.getElementById('printIt')

  // Appel de la librairies pour la sauvegarde
  html2pdf()
    .from(element)
    .set(options)
    .save()
} 

 
}
 