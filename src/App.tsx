import { useState } from "react"
import { QuestionState, fetchQuestions } from "./API"

type Answer = {
  question: string;
  userAnswer: string;
  correct: boolean;
  correctAnswer: string;
}

//Components
import QuestionCard from "./components/QuestionCard"

function App() {

  const totalQuestions: number = 12

  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [questionNbr, setQuestionNbr] = useState(0)
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
      setQuestionNbr(0);
      setLoading(false)
    } catch (error: any) {
      return error instanceof Error ? error.message : error
    }

  }

  const checkAnswer = (e: React.MouseEvent): void => {
    //Triggered when the user clicks an answer
  }

  const nextQuestion = (): void => {

  }

  return (
    <main className="relative">
      <section>
        <h1>CompQuiz</h1>
        {
          (gameOver || userAnswers.length === totalQuestions) && <button onClick={startTrivia}>Start</button>
        }
        {!gameOver && <p>Score</p>}
        {loading && <p>Loading Questions...</p>}
        {/* <QuestionCard
          questionNbr={questionNbr + 1}
          totalQuestions={totalQuestions}
          question={questions[questionNbr].question}
          answers={questions[questionNbr].answers}
          userAnswer={userAnswers ? userAnswers[questionNbr] : undefined}
          callback={checkAnswer}
        /> */}
        <button className="" onClick={nextQuestion}>Next Question</button>
      </section>
    </main>
  )
}

export default App
