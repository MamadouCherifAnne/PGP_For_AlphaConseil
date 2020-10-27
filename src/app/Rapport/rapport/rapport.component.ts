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


 
 /*
 getPDF(){
 

 
 
  html2canvas(document.querySelector(".printformClass")).then(function(canvas) {
  canvas.getContext('2d');
   var HTML_Width = canvas.width;
  var HTML_Height = canvas.height;
  var top_left_margin = 15;
  var PDF_Width = pdf.internal.pageSize.getWidth();
  var PDF_Height = pdf.internal.pageSize.getHeight();
  var canvas_image_width = HTML_Width;
  var canvas_image_height = HTML_Height;
  
  var totalPDFPages = Math.ceil(HTML_Height/PDF_Height)-1;
  console.log(canvas.height+"  "+canvas.width);
  
  
  var imgData = canvas.toDataURL("image/jpeg", 1.0);
  var pdf = new jspdf('p', 'pt');
      pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin,canvas_image_width,canvas_image_height);
  
  
  for (var i = 1; i <= totalPDFPages; i++) { 
  pdf.addPage(PDF_Width, PDF_Height);
  let margin=-(PDF_Height*i)+(top_left_margin*4);
  if(i>1)
  {
  margin=margin+i*8;
  }
  console.log(top_left_margin);
  console.log(top_left_margin);
  console.log(-(PDF_Height*i)+(top_left_margin*4));
  pdf.addImage(imgData, 'JPG', top_left_margin, margin,canvas_image_width,canvas_image_height);
  
  }
  
      pdf.save("HTML-Document.pdf");
         });
  };
 */
 
 
}
 