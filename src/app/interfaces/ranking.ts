

export interface Ranking {
    ranking: Array<RankingElement>;
}

export interface RankingElement {
    id:              number;
    first_name:      string;
    last_name:       string;
    email:           string;
    tasks_completed: number;
}




