import { useState } from "react"
import { QuestionState, fetchQuestions } from "./API"

//Components
import QuestionCard from "./components/QuestionCard"

export type Answer = {
  question: string;
  userAnswer: string;
  isCorrect: boolean;
  correctAnswer: string;
}

function App() {

  const totalQuestions: number = 12

  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [questionIdx, setQuestionIdx] = useState(0)
  const [userAnswers, setUserAnswers] = useState<Answer[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)

  const startTrivia = async (): Promise<void | string> => {
    //API call
    setLoading(true);
    setGameOver(false);
    try {
      const newQuestions = await fetchQuestions(totalQuestions, "medium")
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

  return (
    <main className="relative">
      <section className="font-catamaran relative h-screen w-full flex flex-col justify-center items-center">
        <h1 className="text-3xl mb-3">CompQuiz</h1>
        {
          gameOver && <button onClick={startTrivia}>Start</button>
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
          ? 'visible' : 'invisible'} w-fit rounded-full`} onClick={nextQuestion}>Next</button>
      </section>
    </main >
  )
}

export default App
