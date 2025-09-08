import React from "react";

function decodeText(text: string){
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
}

interface QuestionPage{
    questions:{
        question : string;
        incorrect_answers: string[];
        correct_answer: string;
    }
    onAnswerSelected: (isCorrect: boolean) => void
}

const QuestionPage:  React.FC<QuestionPage> = ({ questions, onAnswerSelected}) => {
    const decodeQuestion = decodeText(questions.question)

    const allAnswers = [...questions.incorrect_answers.map(decodeText), decodeText(questions.correct_answer)].sort(() => Math.random() - 0.5);

    const getAnswer = (answer: string) => {
        const isCorrect = answer === decodeText(questions.correct_answer);
        onAnswerSelected(isCorrect);
    }

    return(
        <div id="question-container">
            <h2>{decodeQuestion}</h2>
            <div className="answers-grid">
                {allAnswers.map((answer, index) => (
                    <button key={index} onClick={() => getAnswer(answer)}>
                        {answer}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default QuestionPage;