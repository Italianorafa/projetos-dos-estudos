import { useState, useEffect } from 'react'
import { IoMdSettings } from "react-icons/io";
import { MdDarkMode } from "react-icons/md";
import './App.css'
import SettingsPopup from './settingsPopup'
import QuestionPage from './questions'

function App() {
  const [questions, setQuestions] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [questionIndex, setQuestionIndex] = useState (0);
  const [score, setScore] = useState(0);
  const [configs, setSettings] = useState({
    category: '',
    difficuly: '',
    amount: 10,
    type: ''
  });
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
    const currentSettings = settings || configs;
    try{ 
      let url = "https://opentdb.com/api.php?"
      if(currentSettings.amount < 1){
        alert('Selecione um número de perguntas maior que 1.')
      }
      if(currentSettings.amount){
        url = url + `amount=${currentSettings.amount}&`;
      }
      else{
        url = url + 'amount=10';
      }
      if(currentSettings.category !== "" && currentSettings.category){
        url += `category=${currentSettings.category}&`;
      }
      if(currentSettings.difficulty !== "" && currentSettings.difficulty){
        url += `difficulty=${currentSettings.difficulty}&`;
      }
      if(currentSettings.type !== "" && currentSettings.type){
        url+= `type=${currentSettings.type}&`
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
    setSettings(currentSettings);
  }

  const comecar = (settings) => {
    const currentSettings = settings || configs;
    console.log("configuracoes selecionadas:", currentSettings)
    getQuestions(currentSettings);
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

        <div id='main-content'>
          {!showSettings && questions.length === 0 && questions.length === questionIndex && (
          <div id="questions">
            <h2 id='question'>The ontological argument for the proof of God&#039;s existence is first attributed to whom?</h2>
            <button className='answer'>Anselm of Canterbury</button>
            <button className='answer'>Ren&eacute; Descartes</button>
            <button className='answer'>Immanuel Kant</button>
            <button className='answer'>Aristotle</button>

            <button id='start-quiz' onClick={() => comecar(configs)}>Start Quiz</button>
          </div>
        )}
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
        </div>
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
