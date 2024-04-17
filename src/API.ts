import { shuffleAnswers } from "./utils";


export type Question = {
    type: string;
    question: string;
    category: string;
    difficulty: Difficulty;
    correct_answer: string;
    incorrect_answers: string[]
}

export type QuestionState = Question & { answers: string[]; }

export type Difficulty = "easy" | "medium" | "hard"

export const fetchQuestions = async (amount: number, difficulty: Difficulty) => {

    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&category=18&type=multiple`
    const data = await (await fetch(endpoint)).json()
    // console.log(endpoint)
    // console.log(data)
    if (data.response_code != 0) {
        throw new Error("Api call failed");
    } else {
        return data.results.map((question: Question): Object => ({
            ...question,
            answers: shuffleAnswers([...question.incorrect_answers, question.correct_answer])
        }))
    }
}
