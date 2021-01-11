import { Component,ViewChild, ElementRef, OnInit,AfterViewInit, Input,  } from '@angular/core';
import {Chart} from 'chart.js';
import { ChartComponent } from "ng-apexcharts";
import {GoogleChartInterface} from 'ng2-google-charts';
import {TacheService} from "src/app/services/tache.service";
import {ProjetService} from "src/app/services/projet.service";
declare var google: any;

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";

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
export class ToutLeProjetComponent implements OnInit {

  @Input()  public projetId: any;
  public alltasks: any[];
  loading: any;
  late: any;
  finished: any; 
  avenir: any; 
  nombresdetaches : any;
  pourcenloading: any;
  pourcenlate: any;
  pourcenterminee: any;
  pourcenavenir: any;
  
  public infoTaches: any;
  public data: Object[];
  public chartTitle: string;
  public chartLabel: Object;
  public legend: Object;
  public tooltipSettings: Object;
  public palette: String[];
  //////////////////////////////////////////////////////
  /*
  @ViewChild('pieChart',{static:false}) pieChart: ElementRef

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
  */
  //////////////////////////////////////////////////////


  
  constructor(private tacheService: TacheService, private projetservice: ProjetService) { 
    /*
    this.chartTitle = 'Fruits Consumption Statistics';
    this.data = [
      {name: 'Apple', value: 37, text: '37%'},
      {name: 'Orange', value: 17, text: '17%'},
      {name: 'Mango', value: 19, text: '19%'},
      {name: 'Banana', value: 4, text: '4%'},
      {name: 'Grapes', value: 11, text: '11%'},
      {name: 'Pineapple', value: 12, text: '12%'},
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
    }; */
  }

  ngOnInit() {
    console.log("......///....");
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

    
   
  }
  
  

}
