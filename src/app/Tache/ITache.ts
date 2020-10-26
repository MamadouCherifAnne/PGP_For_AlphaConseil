export interface ITache{
	numTache:number;
	predecesseur:string
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
	tachePrecedente: object[];
	ressources:object[];
	createur:object;
	lastUpdate:Date;
	type:String;
 
	
}

