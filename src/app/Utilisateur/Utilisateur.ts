import { Role } from '../Role/Role';
import { IProfession } from '../Profession/IProfession';

export class Utilisateur{
        
        idUser:number;
        username:string;
        nom:string;
        prenom:string;
        email:string;
        password:String;
        confirmPassword:String;
        adresse:string;
        actif:boolean;
        roles:String[];
        telephone:string;
        company:string;
        projets:any[];
        entreprise: object;
        professions:any[];
        taches:any[];
        messageReceived:any[]
        sendMessages:any[];
        isChefProjet:number
        
        
    


    
}