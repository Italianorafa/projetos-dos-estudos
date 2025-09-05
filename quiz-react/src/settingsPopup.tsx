import React, { useState } from 'react';
import './popup.css'

interface SettingsPopup{
    onClose: () => void;
    onStart: (settings: {category: string, difficulty: string, amount: number, type: string}) => void;
}

function SettingsPopup({ onClose, onStart } : SettingsPopup){
    const [category, setCategory] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [amount, setAmount] = useState(10);
    const [type, setType] = useState('');

    const Start = () => {
        onStart({ category, difficulty, amount, type });
        onClose();
    }

    return (
        <div className='popup-overlay'>
            <div className='popup-content'>
                <h2>Quiz Settings</h2>
                <div className='setting'>
                    <label>How many questions?</label>
                    <input type="number" value={amount} onChange={(event) => setAmount(Number(event.target.value))}/>
                </div>
                
                <div className='setting'>
                    <label>Category:</label>
                    <select name="category" id="category" onChange={(event) => setCategory(event.target.value)}>
                        <option value="">Any category</option>
                        <option value="9">General Knowledge</option>
                        <option value="10">Books</option>
                        <option value="11">Film</option>
                        <option value="12">Music</option>
                        <option value="13">Musicals & Theatres</option>
                        <option value="14">Televison</option>
                        <option value="15">Video Games</option>
                        <option value="16">Board Games</option>
                        <option value="17">Science & Nature</option>
                        <option value="18">Computers</option>
                        <option value="19">Mathematics</option>
                        <option value="20">Mythology</option>
                        <option value="21">Sports</option>
                        <option value="22">Geography</option>
                        <option value="23">History</option>
                        <option value="24">Politics</option>
                        <option value="25">Art</option>
                        <option value="26">Celebrities</option>
                        <option value="27">Animals</option>
                        <option value="28">Vehicles</option>
                        <option value="29">Comics</option>
                        <option value="30">Gadgets</option>
                        <option value="31">Anime & Manga</option>
                        <option value="32">Cartoon & Animations</option>
                    </select>
                </div>

                <div className='setting'>
                    <label>Difficulty:</label>
                    <select name="diff" id="diff" onChange={(event) => setDifficulty(event.target.value)}>
                        <option value="">Any difficulty</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>

                <div className='setting'>
                    <label>Type:</label>
                    <select name="type" id="type" onChange={(event) => setType(event.target.value)}>
                        <option value="">Any type</option>
                        <option value="multiple">Multiple Choice</option>
                        <option value="booblean">True/False</option>
                    </select>
                </div>

                
                <button onClick={Start}>Start quiz</button>
                <button onClick={onClose}>Cancelar</button>
                
            </div>
        </div>
    )
}

export default SettingsPopup;