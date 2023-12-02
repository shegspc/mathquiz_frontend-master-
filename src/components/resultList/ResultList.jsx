import React from 'react';
import  './resultList.css';
import ResultItem from '../resultItem/ResultItem';
import Button from '../UI/button/Button';

const ResultList =(props)=>{
    
 
  return (
    <div className="result-tray"> 
           
    <ul className="results-list">
      {props.results.map((result) => (
        <ResultItem
          key={result._id}
          score={result.score}
          numOfQuestions={result.questionCount}
          time={result.createdAt}
        />
      ))}
    </ul>
    
    <Button onClick={props.onCancel}>Got it!</Button>
    </div>
  );
};
    
export default ResultList;