import { useState, useEffect } from 'react'
import { IoMdSettings } from "react-icons/io";
import { MdDarkMode } from "react-icons/md";
import './App.css'
import SettingsPopup from './settingsPopup'
import QuestionPage from './questions'
import { GiConsoleController } from 'react-icons/gi';

function App() {
  const [questions, setQuestions] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [questionIndex, setQuestionIndex] = useState (0);
  const [score, setScore] = useState(0);
  const [configs, setSettings] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const body = document.body;

    if(!darkMode){
      body.classList.add('darkMode');
    }
    else{
      body.classList.remove('darkMode');
    }
  }, [darkMode])

  const OpenPopup = () => {
    setShowSettings(true);
  }
  // https://opentdb.com/api.php?amount=10&category=19&difficulty=medium&type=multiple
  const getQuestions = async (settings) => {
    try{ 
      let url = "https://opentdb.com/api.php?"
      if(settings.amount < 1){
        alert('Selecione um número de perguntas maior que 1.')
      }
      if(settings.amount){
        url = url + `amount=${settings.amount}&`;
      }
      if(settings.category !== "" && settings.category){
        url += `category=${settings.category}&`;
      }
      if(settings.difficulty !== "" && settings.difficulty){
        url += `difficulty=${settings.difficulty}&`;
      }
      if(settings.type !== "" && settings.type){
        url+= `type=${settings.type}&`
      }
      url = url.slice(0,-1);
      const response = await fetch(url)
      const data = await response.json();

      setQuestions(data.results);
      console.log(data.results);
      console.log(url)
    }
    catch(error){
      console.error('O erro foi:', error);
    }
    setSettings(settings);
  }

  const comecar = (settings) => {
    console.log("configuracoes selecionadas:", settings)
    getQuestions(settings);
    setShowSettings(false);
  }

  const save = (settings) => {
    setSettings(settings);
    setShowSettings(false);
    console.log('configuracoes salvas: ', settings);
    console.log(configs);
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

  const reset = () => {
    setQuestions([]);
    setQuestionIndex(0);
    setScore(0);
    setShowSettings(true);
  }

  return (
    <>
      <header>
        <h1>Trivia Quiz</h1>
        <nav>
          <button onClick={() => setDarkMode(!darkMode)}className='config'><MdDarkMode /></button>
          <button onClick={OpenPopup} className='config'><IoMdSettings /></button>
        </nav>
        
      </header>
      <main>
        
        {showSettings && <SettingsPopup onStart={comecar} onSave={save} onClose={() => setShowSettings(false)}/>}

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
            <button onClick={reset}>Reset quiz</button>
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
