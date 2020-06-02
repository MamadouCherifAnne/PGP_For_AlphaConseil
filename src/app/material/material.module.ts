import { NgModule } from '@angular/core';
import { MatButtonModule, 
  MatToolbarModule,
  MatInputModule,
  MatTableModule,
  MatSelectModule, 
  MatOptionModule,
  MatFormFieldModule,
  MatGridList,
  MatCardModule
 } from '@angular/material';
 import { MatGridListModule, MatCheckboxModule} from '@angular/material';




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
