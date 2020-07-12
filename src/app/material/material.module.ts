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
<<<<<<< HEAD
  MatMenuModule,
  MatTabsModule,
  MatGridListModule, MatCheckboxModule, MatIconModule} from '@angular/material';
=======
  MatGridListModule, MatCheckboxModule, MatIconModule, MatMenuModule} from '@angular/material';
>>>>>>> 1ce35799d665e0b69d64707b5208a3a024c13fad




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
