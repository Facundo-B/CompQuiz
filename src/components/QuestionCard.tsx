import React from 'react'

interface Props {
    question: string;
    questionNbr: number;
    totalQuestions: number;
    answers: string[];
    callback: any;
    userAnswer: any;
}

const QuestionCard: React.FC<Props> = ({ question, questionNbr, totalQuestions, answers, callback, userAnswer }) => {
    return (
        <div>
            <p>Question {questionNbr} of {totalQuestions}</p>
            <p dangerouslySetInnerHTML={{ __html: question }}></p>
            <div>
                {answers.map((answer) => (
                    <div>
                        <button disabled={userAnswer} onClick={callback}>
                            <span dangerouslySetInnerHTML={{ __html: answer }} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default QuestionCard