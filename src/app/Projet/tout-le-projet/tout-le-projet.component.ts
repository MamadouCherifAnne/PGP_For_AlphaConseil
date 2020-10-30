import { Component,ViewChild, OnInit,Input,  } from '@angular/core';
import {Chart} from 'chart.js';
import { ChartComponent } from "ng-apexcharts";
import {GoogleChartInterface} from 'ng2-google-charts';

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
  styleUrls: ['./tout-le-projet.component.scss']
})
export class ToutLeProjetComponent implements OnInit {

  @Input()  public projetId: any;
  
  public pieChart: GoogleChartInterface = {
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
     
    }

  title = 'Browser market shares at a specific website, 2014';
   type = 'PieChart';
   data = [
      ['Firefox', 45.0],
      ['IE', 26.8],
      ['Chrome', 12.8],
      ['Safari', 8.5],
      ['Opera', 6.2],
      ['Others', 0.7] 
   ];
   columnNames = ['Browser', 'Percentage'];
   options = { 
    'width':400,
    'height':300
   };
   //width = 550;
   //height = 400;
  @ViewChild("chart",{static:false}) chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  
  constructor() { }

  ngOnInit() {
    
    
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
