import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { TacheService } from 'src/app/services/tache.service';
import { AddDepenseComponent } from '../add-depense/add-depense.component';

@Component({
  selector: 'app-depenses',
  templateUrl: './depenses.component.html',
  styleUrls: ['./depenses.component.scss']
})
export class DepensesComponent implements OnInit {
  public displayedColumns: string [] = ['libelle', 'date', 'cout','Action']
  public  rechercheKey:string;
  public listDepense:MatTableDataSource<any>;
  public currentTache: any;
  //idTache:number;
  @Input() public idTache: any;
  @ViewChild(MatSort,{static:true}) sort: MatSort;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator

  constructor(private router:ActivatedRoute,private tacheService:TacheService,
    public  dialog : MatDialog) { }

  ngOnInit() {
    //this.idTache = parseInt(this.router.snapshot.paramMap.get('idTache'));
      this.tacheService.getTacheWithDepenses(this.idTache).subscribe(tacheInfo=>{
        if(tacheInfo){
          this.currentTache = tacheInfo;
          

          this.listDepense = new MatTableDataSource(tacheInfo.depenses);
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
  public viderRecherche(){
    this.rechercheKey ="";
    this.appliquerLeFiltre();
  }
  public appliquerLeFiltre(){
    this.listDepense.filter = this.rechercheKey.trim().toLowerCase();
  }

  public refreshlistOfDepense(){
    this.tacheService.getTacheWithDepenses(this.idTache).subscribe(data=>{
      if(data){
        this.currentTache = data;
        this.listDepense = new MatTableDataSource(data.depenses);

      }
  });
}

public onCreate(){
  // if(this.authService.isSuperAdmin ==true){
   const dialogConfig = new MatDialogConfig();
   dialogConfig.disableClose = true;
   dialogConfig.autoFocus = true;
   dialogConfig.data={tache:this.currentTache.tache}
   dialogConfig.width = "60%";
   this.dialog.open(AddDepenseComponent, dialogConfig).afterClosed()
   .subscribe(result => {
     this.refreshlistOfDepense();
   });
  }

  //modifier une depense
  public updateDepense(element){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data={tache:this.currentTache.tache,depense:element}
    dialogConfig.width = "60%";
    this.dialog.open(AddDepenseComponent, dialogConfig).afterClosed()
    .subscribe(result => {
      this.refreshlistOfDepense();
    });
   }



}

