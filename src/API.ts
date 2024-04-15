
export type Difficulty = "easy" | "medium" | "hard"

export const  fetchQuestions = async (amount: number, difficulty: Difficulty) => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&category=18&type=multiple`
    const data = await (await fetch(endpoint)).json()
    console.log(endpoint)
    console.log(data)
}