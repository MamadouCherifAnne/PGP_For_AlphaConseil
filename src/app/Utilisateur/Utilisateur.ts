import { Role } from '../Role/Role';
import { IProfession } from '../Profession/IProfession';

export class Utilisateur{
        
        idUser:number;
        username:string;
        nom:string;
        prenom:string;
        email:string;
        password:string;
        confirmPassword:string;
        adresse:string;
        actif:boolean;
        role:object;
        telephone:string;
        projets:any[];
        entreprise: object;
        professions:any[];
        taches:any[];
        messageReceived:any[]
        sendMessages:any[];
        isChefProjet:number
        
        
    


    
}