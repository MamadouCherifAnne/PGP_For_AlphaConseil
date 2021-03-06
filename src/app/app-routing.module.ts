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

import { JalonComponent } from './Projet/jalon/jalon.component';
import {CommentComponent} from './Projet/comment/comment.component';
import {ActiviteComponent} from './Projet/activite/activite.component';
import {EditTacheComponent} from './Tache/edit-tache/edit-tache.component';
import { MessagerieComponent } from './Message/messagerie/messagerie.component';
import { AddDepenseComponent } from './Depense/add-depense/add-depense.component';
import { DepensesComponent } from './Depense/depenses/depenses.component';
import { FactureTacheComponent } from './Facture/facture-tache/facture-tache.component';

import {RapportComponent} from './Rapport/rapport/rapport.component';
import {RapportPhaseComponent} from './Rapport/rapport-phase/rapport-phase.component';
import {MonTravailComponent} from './Utilisateur/mon-travail/mon-travail.component';

import { LoginComponent } from './Login/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { UserProfilComponent } from './Login/user-profil/user-profil.component';
import { AuthAdminGuard } from './services/auth-admin.guard';
import {ToutLeProjetComponent} from  "./Projet/tout-le-projet/tout-le-projet.component";
import { NotificationComponent } from './notification/notification.component';
import { MembreProjetComponent } from './Projet/membre-projet/membre-projet.component';
import {HomeComponent} from './home/home.component';
import {RegistrationComponent} from './registration/registration.component';
import {EtatProjetComponent} from './Projet/etat-projet/etat-projet.component';
import {ActifsprojetsComponent} from './Projet/actifsprojets/actifsprojets.component';
import {LateprojetsComponent} from './Projet/lateprojets/lateprojets.component';
import {FinishedprojectsComponent} from './Projet/finishedprojects/finishedprojects.component';
import { ExceptionPageComponent } from './exception-page/exception-page.component';
import { ForbidenPageComponent } from './forbiden-page/forbiden-page.component';
import { ServeurExceptionComponent } from './serveur-exception/serveur-exception.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path : 'tableaudebord', component: TableauDeBordComponent, children:[
    {path: '', redirectTo: 'projet', pathMatch: 'full'},
    {path: 'projet', component: AllProjetsComponent,canActivate:[AuthGuard]},
    {path: 'montravail', component:MonTravailComponent,canActivate:[AuthGuard]},
    {path: 'activite', component: ActiviteComponent,canActivate:[AuthGuard]},
    {path: 'user/profil',component: UserProfilComponent, canActivate:[AuthGuard]},
  ]},

  {path: 'utilisateur', component: ListeUtilisateurComponent},
  {path: 'add', component: AjoutUtilisateurComponent},
  {path: 'update',component: UpdateUtilisateurComponent},
  {path: 'utilisateur/details/:iduser',component: DetailUtilisateurComponent,canActivate:[AuthGuard]},

    


  {path: 'utilisateur', component: ListeUtilisateurComponent,canActivate:[AuthAdminGuard,AuthGuard]},
  {path: 'add', component: AjoutUtilisateurComponent,canActivate:[AuthGuard]},
  {path: 'update',component: UpdateUtilisateurComponent,canActivate:[AuthGuard]},
  {path: 'utilisateur/details/:iduser',component: DetailUtilisateurComponent,canActivate:[AuthGuard]},
  {path: 'user/profil',component: UserProfilComponent, canActivate:[AuthGuard]},

  

  {path: 'utilisateur/affect', component: AffectationUserComponent},
  {path: 'utilisateur/gantt/:iduser', component: UtilisateurGanttComponent,canActivate:[AuthGuard]},
  {path:'role', component:ListeRoleComponent,canActivate:[AuthGuard]},

  {path:'profession', component:ListeProfessionComponent,canActivate:[AuthGuard]},
  {path: 'projet/gantt/:id', component: GanttProjectComponent,canActivate:[AuthGuard]},




  {path: 'projet/:id', component: EnsembleVueProjetComponent, children:[
    //{path: '', redirectTo: 'resume', pathMatch: 'full'},
    {path: 'resume/:id', component: ToutLeProjetComponent},
  ] ,canActivate:[AuthGuard]},

  {path: 'task/:id', component: FileComentComponent,canActivate:[AuthGuard]},

  {path: 'MesTache', component: EditTacheComponent,canActivate:[AuthGuard]},
  
 
  {path: 'projet/gantt/:idProjet', component: GanttProjectComponent},
  {path: 'projet/rapport/:idProjet', component: RapportComponent},
  {path: 'phases/rapport/:phaseId', component: RapportPhaseComponent},

  {path:'message/:idDestinataire', component: MessagerieComponent},

  // les liens concernant entreprise
 // {path: 'workspace/new', component:AddEntrepriseComponent},

  {path: 'Taches/:id', component: AltachesComponent,canActivate:[AuthGuard]},
  {path:'jalon/:id', component:JalonComponent,canActivate:[AuthGuard]},

  {path:'depense/:idTache', component:DepensesComponent},
  {path:'tache/facture/:idTache', component:FactureTacheComponent,canActivate:[AuthGuard]},

  {path: 'commentaire/:numProjet', component: CommentComponent},
  {path:'seConnecter', component:LoginComponent},
  {path: 'creeruncompte', component: RegistrationComponent},
  {path:'notifications',component:NotificationComponent},
  {path: 'equipeprojet/:idprojet', component: MembreProjetComponent,canActivate:[AuthGuard]},
  {path: 'projets', component: EtatProjetComponent,children:[
    {path: '', redirectTo: 'actifs', pathMatch: 'full'},
    {path: 'actifs', component: ActifsprojetsComponent},
    {path: 'termines', component: FinishedprojectsComponent},
    {path: 'enretards', component: LateprojetsComponent}
  ],canActivate:[AuthGuard]},
  {path: 'registration', component: RegistrationComponent},
  {path: 'notFound', component: ExceptionPageComponent},
  {path: 'forbiden', component: ForbidenPageComponent},
  {path: 'serverproblem', component: ServeurExceptionComponent},

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
