import React, { useState } from "react";

interface QuestionPage{
    questions:{
        question : string;
        incorrect_answers: string[];
        correct_answer: string;
    }
    onAnswerSelected: (isCorrect: boolean) => void
}

const QuestionPage:  React.FC<QuestionPage> = ({ questions, onAnswerSelected}) => {
    const allAnswers = [...questions.incorrect_answers, questions.correct_answer].sort(() => Math.random() - 0.5);

    const getAnswer = (answer: string) => {
        const isCorrect = answer === questions.correct_answer;
        onAnswerSelected(isCorrect);
    }

    return(
        <div id="question-container">
            <h2>{decodeURIComponent(questions.question)}</h2>
            <div className="answers-grid">
                {allAnswers.map((answer, index) => (
                    <button key={index} onClick={() => getAnswer(answer)}>
                        {decodeURIComponent(answer)}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default QuestionPage;