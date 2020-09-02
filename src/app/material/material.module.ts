import { NgModule } from '@angular/core';
import { MatButtonModule, 
  MatToolbarModule,
  MatInputModule,
  MatTableModule,
  MatSelectModule, 
  MatOptionModule,
  MatFormFieldModule,
  MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule ,
  MatRadioModule,
  MatSidenavModule,
  MatListModule,
  MatDividerModule,
  MatExpansionModule,
  MatProgressBarModule,
  MatSliderModule,
  MatCardModule,
  MatTabsModule,
  MatPaginatorModule,
  MatGridListModule, MatCheckboxModule, MatIconModule, MatMenuModule, MatSortModule} from '@angular/material';

  




const material = [
  MatRadioModule,
  MatMenuModule,
  MatTabsModule,
  MatButtonModule,
  MatToolbarModule,
  MatInputModule,
  MatTableModule,
  MatFormFieldModule,
  MatIconModule,
  MatSelectModule,
  MatDialogModule,
  MatOptionModule,
  MatGridListModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSidenavModule,
  MatCardModule,
  MatListModule,
  MatExpansionModule,
  MatDividerModule,
  MatDialogModule,
  MatProgressBarModule,
  MatSliderModule,
  MatCheckboxModule,
  MatMenuModule,
  MatSortModule,
  MatPaginatorModule
];
@NgModule({
  imports: [
    material
  ],
  exports: [
    material
  ]
})
export class MaterialModule { }
