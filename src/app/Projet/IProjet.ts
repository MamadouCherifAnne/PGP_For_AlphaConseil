export interface IProjet{
    nomProjet: String;
    description: String;
    debutProjet: Date;
    finProjet: Date;
    zoneRealisation: String;
    risque: object[];
    phase: object[];
    responsable: object;
    entreprise:object;
}