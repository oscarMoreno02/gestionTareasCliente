
export interface Usertask {
    first_name: string;
    last_name:  string;
    email:      string;
    createdAt:  string;
    updatedAt:  string;
    tasks:      Task[];
}

export interface Task {
    id:             number;
    description:    string;
    difficulty:     string;
    assignment:     number;
    time_estimated: number;
    time_dedicated: number;
    progress:       number;
    done:           boolean;
    createdAt:      string;
    updatedAt:      string;
}

