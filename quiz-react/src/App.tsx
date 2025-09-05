import React, { useState, useEffect, use } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SettingsPopup from './settingsPopup'
import QuestionPage from './questions'

function App() {
  const [questions, setQuestions] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [questionIndex, setQuestionIndex] = useState (0);
  const [score, setScore] = useState(0);

  const OpenPopup = () => {
    setShowSettings(true);
  }

  const getQuestions = async (settings) => {
    try{
      const response = await fetch(`https://opentdb.com/api.php?amount=${settings.amount}&category=${settings.category}&difficulty=${settings.difficulty}&type=${settings.type}`);
      const data = await response.json();

      setQuestions(data.results);
      console.log(data.results);
    }
    catch(error){
      console.error('O erro foi:', error);
    }
  }

  const comecar = (settings) => {
    console.log("configuracoes selecionadas:", settings)
    getQuestions(settings);
    setShowSettings(false);
  }

  const getAnswer = (isCorrect: boolean) => {
    if(isCorrect){
      setScore(score+1);
    }

    setQuestionIndex(questionIndex + 1);
  }

  const Reload = () => {
    window.location.reload();
  }

  return (
    <>
      <header>
        {questions.length === 0 && (<h1>Trivia Quiz</h1>)}
      </header>
      <main>
        {questions.length === 0 && (<button onClick={OpenPopup}>Configure quiz</button>)}
        
        {showSettings && <SettingsPopup onStart={comecar} onClose={() => setShowSettings(false)}/>}

        {!showSettings && questions.length > 0 && questionIndex < questions.length && (
          <QuestionPage
            questions={questions[questionIndex]}
            onAnswerSelected = {getAnswer}
          />
        )}
        
        {!showSettings && questionIndex >= questions.length && questionIndex > 0 && (
          <div>
            <h2>Quiz finished!</h2>
            <p>Your score is {score} from {questions.length}</p>
            <button onClick={OpenPopup}>Reset quiz</button>
            <button onClick={Reload}>Start screen</button>
          </div>
        )}
      </main>
      <footer>
          <p>
            Made by <strong>Rafael Italiano</strong>
          </p>
      </footer>
    </>
  )
}



export default App
