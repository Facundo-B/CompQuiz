import React from 'react'
import { Answer } from '../App'

type Props = {
    question: string;
    questionNbr: number;
    totalQuestions: number;
    options: string[];
    callback: (e: React.MouseEvent) => void;
    userAnswer: Answer | undefined;
}

const QuestionCard: React.FC<Props> = ({ question, questionNbr, totalQuestions, options, callback, userAnswer }) => {
    return (
        <div className='relative flex flex-col justify-center items-center mb-8'>
            <p>Question <span className='font-bold text-2xl'>{questionNbr}</span> of <span className='font-bold text-2xl'>{totalQuestions}</span></p>
            <p className="text-xl mb-4 text-center px-8 pt-5 md:max-w-xl" dangerouslySetInnerHTML={{ __html: question }}></p>
            <div className='flex flex-col gap-3'>
                {options.map((option) => (
                    <div className="text-lg"key={option}>
                        <button className='btn' disabled={!!userAnswer} onClick={callback}>
                            <span dangerouslySetInnerHTML={{ __html: option }} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default QuestionCard