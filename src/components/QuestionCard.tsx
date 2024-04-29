import React from 'react'
import { Answer } from '../App'

type Props = {
    question: string;
    questionIdx: number;
    totalQuestions: number;
    options: string[];
    callback: (e: React.MouseEvent) => void;
    userAnswer: Answer | undefined;
}

const QuestionCard: React.FC<Props> = ({ question, questionIdx, totalQuestions, options, callback, userAnswer }) => {
    return (
        <div className='relative flex flex-col justify-center items-center mb-8'>
            <p>Question <span className='font-bold text-2xl'>{questionIdx}</span> of <span className='font-bold text-2xl'>{totalQuestions}</span></p>
            <p className="text-xl mb-4 text-center px-8 pt-5 md:max-w-xl" dangerouslySetInnerHTML={{ __html: question }}></p>
            <div id='options-div' className='flex flex-col gap-3'>
                {options.map((option, index) => (
                    <div style={{animationDelay: `${index * 300}ms`}} className={`text-lg rounded border-2 border-transparent animate-fadeUp`} key={option}>
                        <button disabled={!!userAnswer} onClick={callback}>
                            <span dangerouslySetInnerHTML={{ __html: option }} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default QuestionCard