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
  
  MatMenuModule,
  MatTabsModule,
  MatGridListModule, MatCheckboxModule, MatIconModule} from '@angular/material';





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
  MatMenuModule
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
