import React, { useEffect, useState } from "react";

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
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [answered, setAnswered] = useState(false);

    const decodeQuestion = decodeText(questions.question)

    const allAnswers = [...questions.incorrect_answers.map(decodeText), decodeText(questions.correct_answer)].sort(() => Math.random() - 0.5);

    useEffect(() => {
        setAnswered(false);
        setSelectedAnswer('');
    }, [questions])

    const getAnswer = (answer: string) => {
        if(answered){
            return;
        }
        setAnswered(true);

        const isCorrect = answer === questions.correct_answer;
        setTimeout(() => {onAnswerSelected(isCorrect)}, 500)
    }

    return(
        <div id="question-container">
            <h2>{decodeQuestion}</h2>
            <div className="answers-grid">
                {allAnswers.map((answer, index) => {
                    const decodedAnswer = decodeText(answer);
                    setSelectedAnswer(decodedAnswer);
                    let feedbackClass = '';
                    if(answered){
                        if(selectedAnswer === questions.correct_answer){
                            feedbackClass = 'correct'
                        }
                        else{
                            feedbackClass = 'wrong';
                        }
                    }
                    return(
                        <button key={index} className={`${feedbackClass}`} onClick={() => getAnswer(answer)}>
                            {decodedAnswer}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default QuestionPage;