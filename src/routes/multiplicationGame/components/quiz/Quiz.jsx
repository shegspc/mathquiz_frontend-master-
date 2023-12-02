import React, { useState, useContext, useEffect } from 'react';
import { QuizContext } from '../../../../context/QuizContext';
import { AuthContext } from '../../../../context/AuthContext';
import { FaHome } from "react-icons/fa"
import "./quiz.css";

const Quiz = () => {

    const { enteredTable, setEnteredTable } = useContext(QuizContext);
    const { gameState, setGameState } = useContext(QuizContext);
    const { timer, setTimer } = useContext(QuizContext);
    const { score, setScore } = useContext(QuizContext);
    const { questionCounter, setQuestionCounter } = useContext(QuizContext);



    const [inputOne, setInputOne] = useState(1);
    const [inputTwo, setInputTwo] = useState(1);
    const [response, setResponse] = useState("");
    

    const updateResponse = (event) => {
        setResponse(event.target.value);
      };
    
      const inputKeyPress = (event) => {
        if (event.key === "Enter") {
          const answer = parseInt(response);
          if (answer === inputOne * inputTwo) {
            //Answer is correct
            setScore(score + 1);
            setInputOne(Math.ceil(Math.random() * enteredTable));
            setInputTwo(Math.ceil(Math.random() * 12));
            setQuestionCounter(questionCounter + 1);
            setResponse("");
          } else {
            //Answer is wrong
            setScore(score - 1);
            setResponse("");
          }
        }
      };
    
     
      const d = new Date();
      var minutes;
      
   

    if (d.getMinutes() < 10) {
        minutes = "0" + d.getMinutes();
    } else {
        minutes = d.getMinutes();
    }

    const { user} = useContext(AuthContext);
    useEffect(() => {
        
        //timer for quiz - when timer reach 0 "end screen" appears
        const timeOut = timer > 0 && setInterval(() => setTimer(timer - 1), 1000);
        if (timeOut == 0 && user) {
            setGameState("end");
            setScore(score);
            setTimer(0);
            setEnteredTable("")
        }
        else if (timeOut == 0 && !user){
            setGameState("endGuest");
            setScore(score);
            setTimer(0);
            setEnteredTable("")
        }
       
        return () => clearInterval(timeOut);
    }, [timer, setTimer, setGameState, user]);

    

    //restart quiz - go back to main screen, set score to 0 and counter to 60 seconds
    const restartQuiz = () => {
        setScore(0);
        setTimer(60);
        setGameState("start");
        setEnteredTable("")
        
    }

    //Show Yes/No and hide giveUp btn when we click on giveUp btn
    const areYouSure = () => {
        var modal = document.getElementsByClassName("terminal-giveUp");
        document.getElementById("giveUp-section").style.display = "none";
        for(var i=0; i<modal.length; i++) {
            modal[i].style.display = "flex";
        }
    }

    //Hide Yes/No and show giveUp btn when we click on No btn
    const cancel = () => {
        var modal = document.getElementsByClassName("terminal-giveUp");
        document.getElementById("giveUp-section").style.display = "flex";
        for(var i=0; i<modal.length; i++) {
            modal[i].style.display = "none";
        }
    }

   

    return <div className="Quiz fadeIn delay-0_3">
        <div className="terminal-wrapper">
            <div className="terminal-top ">
                <div className="top-left">
                    <div id="red" className="red circle ">
                    </div>
                    <div id="yellow" className="yellow circle">
                    </div>
                   
                </div>
                <div className="top-mid">
                    <div className="house ">
                        <FaHome />
                    </div>
                    {/* Show correct path of question */}
                    
                </div>
               
            </div>
            <div id="terminal-wrapper" className="terminal-bot">
                
                {/* User score */}
                <p className="terminal-prompt mt-25 last-login"><span className="terminal-green">{d.getHours()}:{minutes}</span> Your score is: {score}</p>
                {/* Timer */}
                <p className="terminal-prompt last-login"><span className="terminal-green">{d.getHours()}:{minutes}</span> Your time is: <span style={{color: '#FF5B52'}}>{timer}</span></p>
               
                <p className="terminal-prompt mt-25 last-login" >
                <span className="terminal-green">{d.getHours()}:{minutes}</span>
                </p>
                <p className="terminal-prompt last-login">
                <span className="">(Question {questionCounter}</span>): <span style={{fontSize: "45px"}}>{inputOne} &times; {inputTwo}</span>
                </p>
                <p className="terminal-prompt mt-25 last-login">
                <span className="terminal-green">{d.getHours()}:{minutes}</span> &nbsp;
                <input
                    type='number'
                    onKeyDown={inputKeyPress}
                    onChange={updateResponse}
                    value={response}  
                    placeholder='Enter answer'
                    autoFocus
                />
                </p>
               
                
                {/* Give up button */}
                <div id="giveUp-section" className="mt-10 terminal-prompt terminal-text terminal-start fadeIn">
                    <p className="terminal-green">Give up?</p>
                    <button id="giveUpBtn" onClick={() => { areYouSure(); }} className="giveUpBtn giveUp-transition">Give up</button>
                </div>
                <div className="fadeIn delay-0_3 mt-10 terminal-prompt terminal-text terminal-start terminal-giveUp">
                    <p className="terminal-green">Give Up?</p>
                    <p className="terminal-prompt terminal-msg">Are you sure?</p>
                </div>
                <div className="fadeIn delay-0_5 mt-10 terminal-prompt terminal-text terminal-start terminal-giveUp">
                    <p className="terminal-green">Yes</p>
                    <button onClick={() => { restartQuiz(); }} className="giveUpBtn giveUp-transition">Yes</button>
                </div>
                <div className="fadeIn delay-0_7 mt-10 terminal-prompt terminal-text terminal-start terminal-giveUp">
                    <p className="terminal-green">No</p>
                    <button onClick={() => { cancel(); }} className="startBtn giveUp-transition">No</button>
                </div>
                
            </div>
        </div>
    </div>
};

export default Quiz;