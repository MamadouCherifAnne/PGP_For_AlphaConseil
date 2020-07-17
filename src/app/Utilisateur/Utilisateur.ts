import { Role } from '../Role/Role';
import { IProfession } from '../Profession/IProfession';

export class Utilisateur{
    
        nom:string;
        prenom:string;
        email:string;
        password:string;
        confirmPassword:string;
        adresse:string;
        actif:boolean;
        role:object;
        telephone:string;
        ptojet:object;
        entreprise: object;
        professions:any[];
    


    
}