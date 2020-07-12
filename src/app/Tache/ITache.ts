export interface ITache{
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
	depenses: object[ ];
	fichiers: object[];
	//..................
	predecesseurs: object[];
}