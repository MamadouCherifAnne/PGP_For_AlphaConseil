export class Tache{
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
<<<<<<< HEAD
	depenses: object[];
	fichiers: object[];
	//..................
	predecesseurs: object[];
=======
	depenses: object;
	fichiers: object;
	tachePrecedente:object;
	
>>>>>>> 1ce35799d665e0b69d64707b5208a3a024c13fad
}