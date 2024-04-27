import { useState, useEffect } from "react"
import { QuestionState, fetchQuestions } from "./API"

//Components
import QuestionCard from "./components/QuestionCard"

export type Answer = {
  question: string;
  userAnswer: string;
  isCorrect: boolean;
  correctAnswer: string;
}

export type Difficulty = "easy" | "medium" | "hard"

function App() {

  const totalQuestions: number = 12


  //State
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [questionIdx, setQuestionIdx] = useState(0)
  const [userAnswers, setUserAnswers] = useState<Answer[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)
  const [difficulty, setDifficulty] = useState<Difficulty>("medium")
  const [dark, setDark] = localStorage.dark ? useState<boolean>(JSON.parse(localStorage.dark)) :  useState<boolean>(false);

  const startTrivia = async (): Promise<void | string> => {
    //API call
    setLoading(true);
    setGameOver(false);
    try {
      const newQuestions = await fetchQuestions(totalQuestions, difficulty)
      setQuestions(newQuestions);
      setScore(0);
      setUserAnswers([]);
      setQuestionIdx(0);
      setLoading(false)
    } catch (error: any) {
      return error instanceof Error ? error.message : error
    }

  }

  const checkAnswer = (e: React.MouseEvent): void => {
    //Triggered when the user clicks an answer
    if (!gameOver) {
      //Get text from user's selecter answer
      const userAnswer: string = e.currentTarget.firstElementChild?.textContent as string
      //Mark user answer
      e.currentTarget.parentElement?.classList.replace("border-transparent", "border-teal-500")
      //if correct, increase score
      const isCorrect: boolean = questions[questionIdx].correct_answer === userAnswer
      if (isCorrect) setScore(score + 1)
      //color options
      const optionsDiv: HTMLElement = document.getElementById('options-div') as HTMLElement
      for (const option of optionsDiv.children) {
        option.firstChild?.textContent == questions[questionIdx].correct_answer
          ? option.firstElementChild?.classList.add("btn-correct")
          : option.firstElementChild?.classList.add("btn-incorrect")
      }
      // Save answer in the user answer's array
      const newAnswer: Answer = {
        question: questions[questionIdx].question,
        userAnswer,
        isCorrect: isCorrect,
        correctAnswer: questions[questionIdx].correct_answer
      }
      setUserAnswers(prevAnswers => [...prevAnswers, newAnswer])
    }
  }

  const nextQuestion = (): void => {
    //Move to next question, if it's not the last
    const next = questionIdx + 1;
    if (next === totalQuestions) {
      setGameOver(true);
    } else {
      setQuestionIdx(next)
    }

  }

  useEffect(() => {
     localStorage.dark = JSON.stringify(dark)
}, [dark]);

  const toggleDarkMode = () => {
    setDark(!dark);
  }

  return (
    <main className={`${dark ? "dark" : ""} relative`} >
      <section className="font-catamaran relative h-screen w-full dark:bg-slate-900 dark:text-white transition-colors duration-200 flex flex-col">
        <div>
          <button onClick={toggleDarkMode} className="rounded-full mt-5 ml-5 w-[50px] h-[30px] p-1 sm:w-[80px] sm:h-[40px]">
            <img src="/darkmode-icon.svg" className="object-contain w-full h-full" alt="" />
          </button>
        </div>

        <div className="flex flex-col justify-center items-center h-screen">
          <h1 className="text-3xl">CompQuiz</h1>
          {gameOver
            && <><div className="flex items-center my-4">
              <span className="mr-2">Choose difficulty: </span>
              <select className="shadow border border-gray-400 rounded dark:bg-slate-900 dark:text-white" name="selected-difficulty"
                value={difficulty} onChange={e => setDifficulty(e.target.value as Difficulty)}>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
              <button onClick={startTrivia}>Start</button></>
          }
          {gameOver && userAnswers.length === totalQuestions && <p className="text-3xl mt-6">Your score is: {score}</p>}
          {loading && <p>Loading Questions...</p>}

          {!loading && !gameOver && <QuestionCard
            questionIdx={questionIdx + 1}
            totalQuestions={totalQuestions}
            question={questions[questionIdx].question}
            options={questions[questionIdx].answers}
            userAnswer={userAnswers ? userAnswers[questionIdx] : undefined}
            callback={checkAnswer}
          />}

          <button className={`${!gameOver && !loading
            && userAnswers.length == questionIdx + 1 //show next question button if user inputs an answer
            // && questionIdx !== totalQuestions - 1 //show next question button if it's not the last
            ? 'visible' : 'invisible'} w-fit rounded-full `} onClick={nextQuestion}>Next</button>
        </div>
      </section>
    </main >
  )
}

export default App
