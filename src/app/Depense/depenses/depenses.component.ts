import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { TacheService } from 'src/app/services/tache.service';

@Component({
  selector: 'app-depenses',
  templateUrl: './depenses.component.html',
  styleUrls: ['./depenses.component.scss']
})
export class DepensesComponent implements OnInit {
  displayedColumns: string [] = ['libelle', 'date', 'cout']
  rechercheKey:string;
  listDepense:MatTableDataSource<any>;
  idTache:number;
  @ViewChild(MatSort,{static:true}) sort: MatSort;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator

  constructor(private router:ActivatedRoute,private tacheService:TacheService) { }

  ngOnInit() {
      this.idTache = parseInt(this.router.snapshot.paramMap.get('idTache'));
      this.tacheService.getTaskDepenses(this.idTache).subscribe(depenses=>{
        if(depenses){
         /* let array = depenses.map(item=>{
         /*   return {
              $key:item.NumDepense,
              ...item.val()
            };
            this.listDepense = new MatTableDataSource(array);
          })*/
          this.listDepense = new MatTableDataSource(depenses);
          this.listDepense.sort = this.sort;
          this.paginator._intl.itemsPerPageLabel="élements par page";
          this.paginator._intl.nextPageLabel="suivant";
          this.paginator._intl.previousPageLabel ="précédent";
          
          this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
            const start = page * pageSize + 1;
            const end = (page + 1) * pageSize;
            return `${start} - ${end} de ${length}`;
          };
          this.listDepense.paginator =this.paginator;
        }
      });
  }

  // Vider l'espace de recherche
  viderRecherche(){
    this.rechercheKey ="";
    this.appliquerLeFiltre();
  }
  appliquerLeFiltre(){
    this.listDepense.filter = this.rechercheKey.trim().toLowerCase();
  }

}
