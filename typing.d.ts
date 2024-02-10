interface IQuestion {
    type: string;
    difficulty: string;
    category: string;
    question: string;
    correctAnswer: string;
    chooses: string[];
}

interface IBoard {
    id: string;
    score: number;
    testerName:string;
}