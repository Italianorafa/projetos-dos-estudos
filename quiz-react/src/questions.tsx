import React, { useEffect , useState } from "react";


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
    const [sortedAnswers, setSortedAnswers] = useState<string[]>([])

    const decodeQuestion = decodeText(questions.question)

    

    useEffect(() => {
        const allAnswers = [...questions.incorrect_answers.map(decodeText), decodeText(questions.correct_answer)];
        const decodedAnswers = allAnswers.map(decodeText);
        setSortedAnswers(decodedAnswers.sort(() => Math.random() - 0.5))

        setSelectedAnswer('');
        setAnswered(false);
    }, [questions])

    const getAnswer = (answer: string) => {
        if(answered){
            return;
        }
        setSelectedAnswer(decodeText(answer))
        setAnswered(true);

        const isCorrect = answer === questions.correct_answer;
        setTimeout(() => {onAnswerSelected(isCorrect)}, 500);
    }

    return(
        <div id="questions">
            <h2 id="question">{decodeQuestion}</h2>
                {sortedAnswers.map((answer, index) => {
                    const decodedAnswer = decodeText(answer);
                    let feedbackClass = '';
                    if(answered){
                        if(answer === selectedAnswer){
                            const isCorrect = answer === questions.correct_answer;
                            feedbackClass = isCorrect ? 'correct' : 'wrong'
                        }
                    }
                    return(
                        <button key={index} className={`${feedbackClass} answer`} onClick={() => getAnswer(answer)}>
                            {decodedAnswer}
                        </button>
                    );
                })}
        </div>
    );
};

export default QuestionPage;