export interface ITache{
	numTache:number;
    nomTache: String;
	debutTache: Date;
	finTache: Date;
	tauxAvancement: number;
    chargeTache: number;
	niveauPriorite: String;
	duree : number;
	phase: object;
	facture: object;
	depenses: object;
	fichiers: object;
	tachePrecedente:object[];
	predecesseur:string
	ressources:any [];
}
