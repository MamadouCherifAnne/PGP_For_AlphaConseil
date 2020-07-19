export interface IProjet{
    nomProjet: String;
    description: String;
    debutProjet: Date;
    finProjet: Date;
    zoneRealisation: String;
    risque: object[];
    phase: object[];
    responsables: object[];
}