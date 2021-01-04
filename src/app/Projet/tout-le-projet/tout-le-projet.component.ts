import { Component,ViewChild, ElementRef, OnInit,AfterViewInit, Input,  } from '@angular/core';
import {Chart} from 'chart.js';
import { ChartComponent } from "ng-apexcharts";
import {GoogleChartInterface} from 'ng2-google-charts';
import {TacheService} from "src/app/services/tache.service";
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
  styleUrls: ['./tout-le-projet.component.scss']
})
export class ToutLeProjetComponent implements OnInit, AfterViewInit {

  @Input()  public projetId: any;
  loading: any;
  late: any;
  finished: any; 
  public infoTaches: any;
 /* public pieChart: GoogleChartInterface = {
    chartType: 'PieChart',
    dataTable: [
      ['Les taches du projet', 'Les taches  du projet'],
      ['Taches en cours', 11],
      ['Teches en retards', 2],
      ['Taches terminées', 2],
     
    ],
    options: {'title': 'Tasks',
      'width':400,
      'height':300
     },
     
    } */

  //////////////////////////////////////////////////////
  @ViewChild('pieChart',{static:true}) pieChart: ElementRef

  drawChart = () => {

  const data = google.visualization.arrayToDataTable([
    ['Les taches du projet', 'Les taches  du projet'],
    ['Taches en cours', this.loading],
    ['Teches en retards', this.late],
    ['Taches terminées', this.finished],
  ]);

  const options = {
    title: 'Tâches',
    legend: {position: 'top'},
    colors: ['#1E90FF', '#FF0000', '#32CD32'], is3D: true
  };

  const chart = new google.visualization.PieChart(this.pieChart.nativeElement);

  chart.draw(data, options);
}

  ngAfterViewInit() {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChart);
  }
  //////////////////////////////////////////////////////

  @ViewChild("chart",{static:false}) chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public isAdmin:boolean = false;
  
  constructor(private tacheService: TacheService,public authService:AuthentificationService) { }

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin;
    console.log("......///....");
    this.tacheService.getTachesInfo(this.projetId).subscribe(data=>{
      if(data){
        this.infoTaches = data;
        this.loading = data.nbrTachesEnCours;
        this.finished = data.nbrTacesTerminees;
        this.late = data.nbrTachesEnRetards;
        console.log("///late//"+this.loading);
      }
    });

    
    /* ///////////////////////////////////////
    this.chartOptions = {
      series: [44, 55, 13],
      chart: {
        type: "donut"
      },
      labels: ["Team A", "Team B", "Team C",],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: '30%',
              size: '65%'
              
            },
            
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };  */
   
  }

 

}
