export class Tache{
	numTache:number
	nomTache: String;
	description : String;
	debutTache: Date;
	finTache: Date;
	tauxAvancement: number;
    chargeTache: number;
	niveauPriorite: String;
	duree : number;
	phase: object;
	facture: object;
	depenses: object[];
	fichiers: object[];
	predecesseurs: string;
	tachePrecedente:any[];
	commentaires:object[]
	ressources:object[];
	taches:object[];
	createur:object;
	lastUpdate:Date;
	type:String;
	
}