import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {PhaseService} from 'src/app/services/phase.service';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-rapport-phase',
  templateUrl: './rapport-phase.component.html',
  styleUrls: ['./rapport-phase.component.scss']
})
export class RapportPhaseComponent implements OnInit {

  phaseId: any;
  phase: any;
  projet: any;
  
  constructor(private route: ActivatedRoute, private phaseService: PhaseService) { }

  ngOnInit() {
    this.phaseId = this.route.snapshot.paramMap.get('phaseId');

    let valeur = this.phaseService.findById(this.phaseId);
    valeur.subscribe((data)=>{
    if(data){
      this.phase = data;
    } 
    });

    this.phaseService.getProjetOfPhase(this.phaseId).subscribe((data)=>{
      if(data){
        this.projet = data;
      }
    });
   
  }

  download(){
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
    // Few necessary setting options
    var imgWidth = 208;
    var pageHeight = 295;
    var imgHeight = canvas.height * imgWidth / canvas.width;
    var heightLeft = imgHeight;
     
    const contentDataURL = canvas.toDataURL('image/png')
    let pdf = new jspdf('p', 'mm', 'a4');
    var position = 0;
    pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
    pdf.save('new-file.pdf'); // Generated PDF
    });
    }

}
