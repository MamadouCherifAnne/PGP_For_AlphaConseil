import { Component,ViewChild, ElementRef, OnInit,AfterViewInit, Input,  } from '@angular/core';
import { ChartComponent } from "ng-apexcharts";
import {GoogleChartInterface} from 'ng2-google-charts';
import {TacheService} from "src/app/services/tache.service";
import {ProjetService} from "src/app/services/projet.service";
import * as Chart from 'chart.js'

declare var google: any;

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";
import { AuthentificationService } from 'src/app/services/authentification.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};
@Component({
  selector: 'app-tout-le-projet',
  templateUrl: './tout-le-projet.component.html',
  styleUrls: ['./tout-le-projet.component.scss'],
  //encapsulation: ViewEncapsulation.None
})
export class ToutLeProjetComponent implements OnInit, AfterViewInit {

  @Input()  public projetId: any;
  public alltasks: any[];
  loading: any = 0;
  late: any = 0;
  finished: any = 0; 
  avenir: any = 0; 
  nombresdetaches : any;
  pourcenloading: any;
  pourcenlate: any;
  pourcenterminee: any;
  pourcenavenir: any;
  
  public infoTaches: any;
//  public data: Object[];
 // public chartTitle: string;
 // public chartLabel: Object;
 // public legend: Object;
 // public tooltipSettings: Object;
  //public palette: String[];
  public isAdmin:boolean = false;
  
  constructor(private tacheService: TacheService,public authService:AuthentificationService) { }


  title = 'angular8chartjs';
  canvas: any;
  ctx: any;
  ngAfterViewInit() {
   /* this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    let myChart = new Chart(this.ctx, {
      type: 'pie',
      data: {
          labels: ["New", "In Progress", "On Hold", "hacge"],
          datasets: [{
              label: '# of Votes',
              data: [this.loading,this.finished, this.late, 4],
              backgroundColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(54, 162, 235, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
        responsive: false,
        display:true
      }
    });*/
  }

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin;
    console.log("......///....");

    this.tacheService.getTachesInfo(this.projetId).subscribe(data=>{
      if(data){
        this.infoTaches = data;
        this.loading = data.nbrTachesEnCours;
        this.finished = data.nbrTacesTerminees;
        this.late = data.nbrTachesEnRetards;
        this.avenir = data.nbrTachesAvenir;
        console.log("loading....."+this.loading)
        console.log("finished....."+this.finished)
        console.log("late....."+this.late)
        console.log("avenir....."+this.avenir)

        this.chargerAnalyseProjet();
      }
    })
    /*
    this.tacheService.getTachesInfo(this.projetId).subscribe(data=>{
      if(data){
        this.infoTaches = data;
        this.loading = data.nbrTachesEnCours;
        this.finished = data.nbrTacesTerminees;
        this.late = data.nbrTachesEnRetards;
        this.avenir = data.nbrTachesAvenir;
        this.nombresdetaches = this.loading + this.finished + this.late + this.avenir;
        console.log("///toutes les taches //"+ this.nombresdetaches);
        this.pourcenloading =  this.loading * 100 /  this.nombresdetaches;
        this.pourcenlate = this.late * 100 / this.nombresdetaches;
        this.pourcenterminee =  this.finished * 100 / this.nombresdetaches;
        this.pourcenavenir =  this.avenir * 100 / this.nombresdetaches;

        this.chartTitle = 'Les taches  du projet';
       // this.palette = ['#1E90FF', , '#FF0000', '#32CD32', '#FF8C00'];
       this.palette = ['#DAA520' , '#DC143C', '#008000', '#0000CD'];
        this.data = [
            {name:'Taches en cours', value: this.loading, text: ''+this.pourcenloading+'%'},
            {name: 'Teches en retards', value: this.late, text: ''+this.pourcenlate+'%'},
            {name: 'Taches terminées', value: this.finished, text: ''+this.pourcenterminee+'%'},
            {name: 'Taches à venir', value: this.avenir, text: ''+this.pourcenavenir+'%'},
        ]
        console.log("ça load ici"+this.loading)
        this.tooltipSettings = {
           enable: true,
           format: '${point.x} : <b>${point.y}%</b>'
        };
    
        this.chartLabel = {
          visible: true,
          position: 'Inside',
          name: 'text',
        };
        this.legend = {
          visible: true,
          position: 'Bottom',
          height: '8%',
          width: '35%'
        };
      
      }
    });
    */
    

   
  }
  
    public chargerAnalyseProjet(){
      this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    let myChart = new Chart(this.ctx, {
      type: 'doughnut',
      data: {
          labels: ["Tâches à venir","Tâches en cours", "Tâches terminées", "Tâches en retards "],
          datasets: [{
              label: {position: 'bottom', }, 
              data: [ this.avenir,this.loading,this.finished, this.late],
              backgroundColor: [
                   'rgb(0,0,139)',
                   'rgb(65,105,225)',
                   'rgb(60,179,113)',
                   'rgb(220,20,60)',
              ],
              borderWidth: 1
          }]
      },
      options: {
        responsive: false,
        display:true
      }
    });
    }
  

}
