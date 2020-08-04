import {Tache} from "src/app/Tache/Tache"
export interface Iphase{
    numTache:number;
    nomTache: String;
    debutTache:Date;
    finTache:Date;
    description: String;
    projet: object;
    taches: Tache[];
}