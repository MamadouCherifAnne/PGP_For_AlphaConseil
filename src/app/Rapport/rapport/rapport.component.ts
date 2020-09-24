import { Component,ViewChild, ElementRef, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ProjetService} from 'src/app/services/projet.service';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
//import { jsPDF } from 'jspdf';


@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
  styleUrls: ['./rapport.component.scss']
})
export class RapportComponent implements OnInit {
 

  projetId: any;
  projet : any;
  allphase: any;

 
  
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

  createpdf() {
    var data = document.getElementById('content');
    var date = new Date();
    html2canvas(data).then(canvas => {
    var imgWidth = 210;
    var pageHeight = 295;
    var imgHeight = canvas.height * imgWidth / canvas.width;
    var heightLeft = imgHeight;
    
      //enter code here
      const imgData = canvas.toDataURL('image/png')
    
      var doc = new jspdf('p', 'mm');
      var position = 0;
    
      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight+15);
      heightLeft -= pageHeight;
    
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight + 15);
        heightLeft -= pageHeight;
      }
    doc.save ('Visiometria.pdf')
    
    });
  } 
  
 
}
 