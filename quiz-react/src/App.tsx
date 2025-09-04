import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SettingsPopup from './settingsPopup'

function App() {
  const [showSettings, setShowSettings] = useState(false)

  

  const Start = (settings) => {
    console.log("configuracoes selecionadas:", settings)
    fetch(``)
    setShowSettings(true);
  }
  return (
    <>
      <header>
        <h1>Trivia Quiz</h1>
      </header>
      <main>
        <button onClick={Start}>Configure quiz</button>
        
        {showSettings && <SettingsPopup onStart={Start} onClose={() => setShowSettings(false)}/>}
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
