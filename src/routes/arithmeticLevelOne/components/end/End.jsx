import React, { useContext, useState, useEffect } from 'react';
import { QuizContext } from '../../../../context/QuizContext';
import { FaHome } from "react-icons/fa";
import './end.css';
import { AuthContext } from '../../../../context/AuthContext';
import axios from 'axios';
import {Link, useNavigate } from 'react-router-dom';
import ResultDisplay from '../../../../components/resultDisplay/ResultDisplay';
import useFetch from '../../../../hooks/useFetch'


const End = () => {
    const [error, setError] = useState(false);
    const [saved, setSaved] = useState(false);
    const { gameState, setGameState } = useContext(QuizContext);
    const { score, setScore } = useContext(QuizContext);
    const { timer, setTimer } = useContext(QuizContext);
    // const { enteredTable, setEnteredTable } = useContext(QuizContext);
    const { verdict, setVerdict } = useContext(QuizContext);
    const { questionCounter, setQuestionCounter } = useContext(QuizContext);




    const d = new Date();
    var minutes;


    if (d.getMinutes()> 10) {
        minutes ="0"+ d.getMinutes();
    }
     else {
        minutes = d.getMinutes();
     }




   // This is calculating User's speed
   const speedCalculator = (marks, timeSpent) => {
    const speed = parseInt(marks) / parseInt(timeSpent);
    return speed.toFixed(2);
};
  let speed = speedCalculator(parseInt(score), 60);
     
  useEffect(() =>{
    if (speed >= 0.45){
      setVerdict("Wow, that was quite fast! Good job!"); 
     
     }
     else if (speed < 0.45 && speed > 0.35){
      setVerdict("Your speed was good. There is room for improvement though!");
      
     }
     else{
      setVerdict("That wasn't fast enough. Try harder, next time!"); 
     }
  },[speed],setVerdict,verdict);

    const navigate = useNavigate();

  
  //Try again - show main screen, set score back to 0, set counter back to 240 seconds
  const reStart = () => {
    setScore(0);
    setTimer(100);
    setGameState("start");
    // setEnteredTable("")
    setQuestionCounter(1)
};

  const  {user} = useContext(AuthContext) 

  const handleSave = async (e) => {
    e.preventDefault(); 
   try{
      const newPost = {
       score:score,
	     questionCount:questionCounter,
	     user:user
      };

    await axios.post("https://mymathquizapi.onrender.com/backend/arithmeticResult/postResult", newPost);
    setSaved(true)
    navigate("/arithmetic")
  } catch (err) {
    console.log(err);
    setError(true);
  }
};
 

const userId = user._id 
  
 const {data}  = useFetch(`https://mymathquizapi.onrender.com/backend/arithmeticResult/getResult/${userId}`);
 
 return <div className="End fadeIn delay-0_3">
 <div className="terminal-wrapper">
     <div className="terminal-top ">
         <div className="top-left">
             <div className="red circle ">

             </div>
             <div className="yellow circle">

             </div>
             <div className="green circle">

             </div>
         </div>
         <div className="top-mid">
             <div className="house ">
                 <FaHome />
             </div>
             <span className="">Arithmetic Game</span>
         </div>
         <div>

         </div>
     </div>
     <div className="terminal-bot">
         {/* End message */}
         <p className="terminal-prompt last-login">Arithmetic Game</p>


         <p className="terminal-prompt mt-25 terminal-msg"><span className="terminal-green">{d.getHours()}:{minutes} </span>Ok {user.name[0].toUpperCase() + user.name.substr(1)}</p>
        
         <p className="terminal-prompt terminal-msg"><span className="terminal-green">{d.getHours()}:{minutes} </span> Our journey has come to an end for now.</p>
         {/* Score */}
         <p className="terminal-prompt terminal-msg"><span className="terminal-green">{d.getHours()}:{minutes} </span>  You scored: {score} / {questionCounter} (
           {(score / questionCounter).toFixed(2) * 100}%)</p>
         
           <p className="terminal-prompt terminal-msg"><span className="terminal-green">{d.getHours()}:{minutes} </span> Your speed: {speed} questions per second.</p>
         
         {/* Depends on score get different message */}
         <p className="terminal-prompt terminal-msg"><span className="terminal-green">{d.getHours()}:{minutes} </span> {verdict} </p>
         {/* End question */}
         <div className="mt-25 terminal-prompt terminal-text">
             <p className="terminal-green">{d.getHours()}:{minutes}</p>
             <p className="pl-7">Not satisfied? <button onClick={() => { reStart(); }} className="startBtn button-transition">Try again</button></p>
         </div>
         
         {/* Save Result */}
         <div className="mt-25 terminal-prompt terminal-text">
             <p className="terminal-green">{d.getHours()}:{minutes}</p>
             <p className="pl-7">Want to save the result? <button disabled={saved} onClick={handleSave} className="startBtn button-transition">Save Result</button></p>
         </div>

         <div className="mt-25 terminal-prompt terminal-text">
           <p className="terminal-green">{d.getHours()}:{minutes}</p>
           <p className="pl-7"><Link to="/menu"><button className="startBtn button-transition">Back to Menu</button></Link></p>
       </div>
        
         <div className="listResult">
        
         {data.length === 0 ? <div className="mt-25 terminal-prompt terminal-text">
           <p className="terminal-green">{d.getHours()}:{minutes} No results</p></div>: <ResultDisplay results={data} /> }
       </div> 
     </div>
 </div>
</div>

}


export  default End;


