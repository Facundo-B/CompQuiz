import { useState } from "react"
import QuestionCard from "./components/QuestionCard"
import { fetchQuestions} from "./API"

function App() {

  const totalQuestions: number = 12

  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState([])
  const [questionNbr, setQuestionNbr] = useState(0)
  const [userAnswers, setUserAnswers] = useState([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)

  console.log(fetchQuestions(totalQuestions, "easy"))

  const startTrivia = async () => {
    //API call  
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
        <button onClick={startTrivia}>Start</button>
        <p>Score</p>
        <p>Loading Questions...</p>
        <QuestionCard
        questionNbr={questionNbr + 1}
        totalQuestions={totalQuestions}
        question = {questions[questionNbr].question}
        answers={questions[questionNbr].answer}
        userAnswer={userAnswers ? userAnswers[questionNbr] : undefined}
        callback={checkAnswer}
        />
        <button onClick={nextQuestion}>Next Question</button>
      </section>
    </main>
  )
}

export default App
