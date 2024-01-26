
export interface TopLevel {
    msg:  string;
    data: Task;
}

export interface Task {
    id:             number;
    description:    string;
    difficulty:     string;
    assignment:     null;
    time_estimated: number;
    time_dedicated: number;
    progress:       number;
    done:           boolean;
    createdAt:      string;
    updatedAt:      string;
}
