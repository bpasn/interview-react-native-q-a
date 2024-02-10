import { create } from 'zustand';
import { questions } from "@/question.json";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist } from "zustand/middleware";
interface IQuistionExtend extends IQuestion {
    id: string;
}
interface IAsnwers {
    id: string;
    asnwer: string;
    correct: string;
}
interface IScore {
    correct: number;
    incorrect: number;
    result: string;
}
interface StoreQuestion {
    loading: boolean;
    question: IQuistionExtend[];
    testerName: string;
    createQuestionState:() => void;
    setTesterName: (s: string) => void;
    asnwers: Array<IAsnwers>;
    score: IScore | null;
    findAsnwers: (id: string) => IAsnwers | null;
    compare: () => Promise<IScore>;
    onSelect: (v: string, id: string, correct: string) => void;
    onValidate: () => boolean;
    setQuestion: () => void;
    setLoading: () => void;
    onSubmit: boolean;

}


const useStoreQuestion = create<StoreQuestion>()((set, get) => ({
    question: [],
    asnwers: [],
    loading: false,
    testerName: "",
    score: null,
    onSubmit: false,
    createQuestionState:() => set({
        loading:false,
        question:[],
        asnwers:[],
        testerName:"",
        onSubmit:false,
    }),
    setTesterName: (testerName: string) => set({ testerName, loading: true }),
    setLoading: () => set({ loading: !get().loading }),
    setQuestion: async () => {
        set({
            loading: true,
            asnwers: []
        });
        await delay(2 * 1000);
        set({ question: randomQuestion(), loading: false });
    },
    findAsnwers: (id: string) => {
        const asnwer = get().asnwers.find(asw => asw.id === id);
        if (!asnwer) return null;
        return asnwer;
    },
    onSelect: (v: string, id: string, correct: string) => {
        const exists = get().asnwers.find(a => a.id === id);
        set({
            asnwers: exists ? get().asnwers.map(e => {
                if (e.id === id) {
                    e.asnwer = v;
                }
                return e;
            }) : [...get().asnwers, { id, asnwer: v, correct }]
        });
    },
    compare: async (): Promise<IScore> => {
        set({ onSubmit: true });
        const correct = get().asnwers.reduce((prv, cur) => prv += cur.correct === cur.asnwer ? 1 : 0, 0);
        const incorrect = get().asnwers.reduce((prv, cur) => prv += cur.correct !== cur.asnwer ? 1 : 0, 0);
        await delay(3 * 1000);
        const score = {
            result: String(`${correct}/${get().question.length}`),
            correct,
            incorrect,
        };
        set({
            onSubmit: false,
            score
        });
        return score;
    },
    onValidate: () => {
        console.log(get().asnwers.length);
        console.log(get().question.length);
        if (get().asnwers.length !== get().question.length) return false;
        return true;
    }
}));

const delay = (duration: number) => new Promise(resolve => { setTimeout(resolve, duration); });
const randomQuestion = (): IQuistionExtend[] => {
    let tmp = [...questions];
    let limit = 20;

    const getRandomInt = (max: number): number => Math.floor(Math.random() * max);

    const getRandomChoices = (question: IQuestion): string[] => {
        const randomIndex = getRandomInt(4);
        let choices = [...question.chooses];

        if (choices.length < 4) {
            choices.splice(randomIndex, 0, question.correctAnswer);
        }

        return choices.map(v => v.replace(/(&deg;)/g, "°"));
    };
    // Shuffle the questions array randomly
    for (let i = tmp.length - 1; i > 0; i--) {
        const j = getRandomInt(i + 1);
        [tmp[i], tmp[j]] = [tmp[j], tmp[i]];
    }
    const mapQuestionField = tmp.slice(0, limit).map((question: IQuestion, index) => {
        const chooses = getRandomChoices(question);
        return {
            id: String(index + 1),
            ...question,
            chooses
        };
    });

    return mapQuestionField;
};

export default useStoreQuestion;