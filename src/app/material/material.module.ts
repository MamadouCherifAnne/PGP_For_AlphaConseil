import { NgModule } from '@angular/core';
import { MatButtonModule, 
  MatToolbarModule,
  MatInputModule,
  MatTableModule,
  MatSelectModule, 
  MatOptionModule,
  MatFormFieldModule,
  
  MatCardModule
 } from '@angular/material';
 import { MatGridListModule, MatCheckboxModule, MatIconModule} from '@angular/material';




const material = [
  MatButtonModule,
  MatToolbarModule,
  MatInputModule,
  MatTableModule,
  MatFormFieldModule,
  MatIconModule,
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
