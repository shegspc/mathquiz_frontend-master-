import React, {useState} from "react";
import Start from "./components/start/Start";
import Quiz from "./components/quiz/Quiz";
import End from "./components/end/End";
import {QuizContext} from '../../context/QuizContext';
import './arithmetic.css';
import EndGuest from "./components/end/EndGuest";


const ArithmeticGame = () => {
  const [timer, setTimer] = useState(100);
  const [enteredTable, setEnteredTable] = useState("");
  const [gameState, setGameState] = useState("start");
  const [score, setScore] = useState(0);
  const [verdict, setVerdict] = useState("");
  const [questionCounter, setQuestionCounter] = useState(1);

  return <div className="ArithmeticGame" id="arithmeticGame">
    <QuizContext.Provider value={{gameState, setGameState, score, setScore, timer, setTimer, enteredTable, setEnteredTable, verdict, setVerdict, questionCounter, setQuestionCounter}}>
      {gameState === "start" && <Start/>}
      {gameState === "quiz" && <Quiz/>}
      {gameState === "end" && <End/>}
      {gameState === "endGuest" && <EndGuest/>}
    </QuizContext.Provider>
  </div>
};

export default ArithmeticGame;  
