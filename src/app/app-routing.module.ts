import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AjoutUtilisateurComponent} from './Utilisateur/ajout-utilisateur/ajout-utilisateur.component'
import { AppComponent } from './app.component';
import { AddRoleComponent } from './Role/add-role/add-role.component';
import {ListeRoleComponent} from './Role/liste-role/liste-role.component'
import { ListeUtilisateurComponent } from './Utilisateur/liste-utilisateur/liste-utilisateur.component';
import { UpdateUtilisateurComponent } from './Utilisateur/update-utilisateur/update-utilisateur.component';
import { AddProfessionComponent } from './Profession/add-profession/add-profession.component';
import { ListeProfessionComponent } from './Profession/liste-profession/liste-profession.component';

import {AllProjetsComponent} from './Projet/all-projets/all-projets.component';
import {AjoutPhaseComponent} from './Phase/ajout-phase/ajout-phase.component';
import {EnsembleVueProjetComponent} from './Projet/ensemble-vue-projet/ensemble-vue-projet.component';
import {TableauDeBordComponent} from './tableau-de-bord/tableau-de-bord.component';
import { DetailUtilisateurComponent } from './Utilisateur/detail-utilisateur/detail-utilisateur.component';
import { AffectationUserComponent } from './Utilisateur/affectation-user/affectation-user.component';
import { UtilisateurGanttComponent } from './Utilisateur/utilisateur-gantt/utilisateur-gantt.component'
import {AltachesComponent} from './altaches/altaches.component';
import { GanttProjectComponent } from './Projet/gantt-project/gantt-project.component';
import {FileComentComponent} from './altaches/file-coment/file-coment.component';
import { AddEntrepriseComponent } from './Entreprise/add-entreprise/add-entreprise.component';
import { JalonComponent } from './Projet/jalon/jalon.component';
import {CommentComponent} from './Projet/comment/comment.component';

import {EditTacheComponent} from './Tache/edit-tache/edit-tache.component';
import { MessagerieComponent } from './Message/messagerie/messagerie.component';
import { AddDepenseComponent } from './Depense/add-depense/add-depense.component';
import { DepensesComponent } from './Depense/depenses/depenses.component';
import { FactureTacheComponent } from './Facture/facture-tache/facture-tache.component';


const routes: Routes = [
  {path : 'tableaudebord', component: TableauDeBordComponent, children:[
    {path: '', redirectTo: 'projet', pathMatch: 'full'},
    {path: 'projet', component: AllProjetsComponent},
  ]},

  {path: 'utilisateur', component: ListeUtilisateurComponent},
  {path: 'add', component: AjoutUtilisateurComponent},
  {path: 'update',component: UpdateUtilisateurComponent},
  {path: 'utilisateur/details/:iduser',component: DetailUtilisateurComponent},
  

  {path: 'utilisateur/affect', component: AffectationUserComponent},
  {path: 'utilisateur/gantt/:iduser', component: UtilisateurGanttComponent},
  {path:'role', component:ListeRoleComponent},

  {path:'profession', component:ListeProfessionComponent},
  {path: 'projet/gantt/:id', component: GanttProjectComponent},




  {path: 'projet/:id', component: EnsembleVueProjetComponent, children:[
   
  ] },

  {path: 'task/:id', component: FileComentComponent},

  {path: 'MesTache', component: EditTacheComponent},
  
 
  {path: 'projet/gantt/:idProjet', component: GanttProjectComponent},

  {path:'message/:idDestinataire', component: MessagerieComponent},

  // les liens concernant entreprise
  {path: 'workspace/new', component:AddEntrepriseComponent},

  {path: 'Taches/:id', component: AltachesComponent},
  {path:'jalon/:id', component:JalonComponent},

  {path:'depense/:idTache', component:DepensesComponent},
  {path:'tache/facture/:idTache', component:FactureTacheComponent},

  {path: 'commentaire', component: CommentComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
