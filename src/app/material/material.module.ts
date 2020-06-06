import { NgModule } from '@angular/core';
import { MatButtonModule, 
  MatToolbarModule,
  MatInputModule,
  MatTableModule,
  MatSelectModule, 
  MatOptionModule,
  MatFormFieldModule,
  MatGridList,
  MatGridListModule, MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCardModule
 } from '@angular/material';
 
const material = [
  MatButtonModule,
  MatToolbarModule,
  MatInputModule,
  MatTableModule,
  MatFormFieldModule,
  MatSelectModule,
  MatOptionModule,
  MatGridListModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule,

  MatCardModule

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
