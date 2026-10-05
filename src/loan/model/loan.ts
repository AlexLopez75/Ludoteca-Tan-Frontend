export interface Loan {

    id?: number;
    gameId?: number;
    gameName?: string;

    clientId?: number;
    clientName?: string;

    startDate?: Date;
    endDate?: Date;

    searchDate?: Date;
}