import { useState } from "react"
import { QuestionState, fetchQuestions } from "./API"

type Answer = {
  question: string;
  userAnswer: string;
  isCorrect: boolean;
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
    if (!gameOver){
      //Get text from user's selecter answer
      const userAnswer = e.currentTarget.firstChild?.textContent as string
      //if correct, increase score
      const isCorrect = questions[questionNbr].correct_answer === userAnswer
      if (isCorrect) setScore(score + 1)
      // Save answer in the user answer's array
      const newAnswer: Answer = {
        question: questions[questionNbr].question,
        userAnswer,
        isCorrect: isCorrect,
        correctAnswer: questions[questionNbr].correct_answer
      }
      setUserAnswers(prevAnswers => prevAnswers.push(newAnswer))
    }
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
        {!loading && !gameOver && <QuestionCard
          questionNbr={questionNbr + 1}
          totalQuestions={totalQuestions}
          question={questions[questionNbr].question}
          answers={questions[questionNbr].answers}
          userAnswer={userAnswers ? userAnswers[questionNbr] : undefined}
          callback={checkAnswer}
        />}
        {!gameOver && !loading
          && userAnswers.length == questionNbr + 1 //show next question if user inputs an answer
          && questionNbr !== totalQuestions - 1 //show next question if it's not the last
          && <button className="" onClick={nextQuestion}>Next Question</button>}
      </section>
    </main>
  )
}

export default App
