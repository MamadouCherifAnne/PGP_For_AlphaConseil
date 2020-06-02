import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from "./material/material.module";
import { AjoutUtilisateurComponent } from './Utilisateur/ajout-utilisateur/ajout-utilisateur.component';
import { UtilisateurService } from './services/utilisateur.service';
import {ReactiveFormsModule} from '@angular/forms';
import { AddRoleComponent } from './Role/add-role/add-role.component'
import { RoleService } from './services/role.service';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { AddProfessionComponent } from './Profession/add-profession/add-profession.component';

const appRoutes:Routes =[
 
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AjoutUtilisateurComponent,
    AddRoleComponent,
    AddProfessionComponent
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    
  ],
  providers: [UtilisateurService,RoleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
