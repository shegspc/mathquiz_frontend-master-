import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { QuizContext } from '../../../../context/QuizContext';
import { FaHome } from "react-icons/fa";
import { AuthContext } from '../../../../context/AuthContext';
import './start.css';

const Start = () => {
    const { gameState, setGameState } = useContext(QuizContext);
    // const { enteredTable, setEnteredTable } = useContext(QuizContext);
    const d = new Date();
    var minutes;
    

    const { user} = useContext(AuthContext);
       
    if(d.getMinutes() < 10) {
        minutes="0"+d.getMinutes();
    } else {
        minutes = d.getMinutes();
    }

    //  // Table change handler
    // const tableChangeHandler = (event) => {
    //     setEnteredTable(event.target.value);
    // };

    return <div className="Main">
        <div className="terminal-wrapper fadeIn">
            <div className="terminal-top ">
                <div className="top-left">
                    <div className="red circle delay-0_5 fadeIn">

                    </div>
                    <div className="yellow circle delay-0_7 fadeIn">

                    </div>
                    <div className="green circle delay-0_9 fadeIn">

                    </div>
                </div>
                <div className="top-mid delay-1_3 fadeIn">
                    <div className="house ">
                        <FaHome />
                    </div>
                    <span className="">Arithmetic Game</span>
                </div>
                <div>
                </div>
            </div>
            <div className="terminal-bot">
                {/* Welcome message */}
                {user ? <p className="terminal-prompt last-login fadeIn delay-2">Hello  {user.name[0].toUpperCase() + user.name.substr(1)}! Ready for the Arithmetic Game?</p>: <p className="terminal-prompt last-login fadeIn delay-2">Hello friend! Ready for the Arithmetic Game? </p>}
               
                <p className="terminal-prompt fadeIn delay-3_5"><span className="terminal-green">{d.getHours()}:{minutes}</span> Getting Ready!! </p>
                <p className="terminal-prompt fadeIn delay-4_5"><span className="terminal-green">{d.getHours()}:{minutes}</span>
                &nbsp;
                </p>                {/* Start button */}
                <div className="mt-10 terminal-prompt terminal-text terminal-start">
                    <p className="terminal-green fadeIn delay-10">{d.getHours()}:{minutes}
                    <button onClick={() => { setGameState("quiz") ;}} className="fadeIn delay-5_5 startBtn button-transition">Start</button>
                    </p>
                    
                   
                </div>
                <div className="mt-10 terminal-prompt terminal-text terminal-start">
                <p className="terminal-green fadeIn delay-10">{d.getHours()}:{minutes}
                    <Link to="/menu"><button  className="fadeIn delay-10_5 startBtn button-transition">Menu</button></Link>
                </p>
                </div>
            </div>
        </div>
    </div>
    
   
} 
export default Start;