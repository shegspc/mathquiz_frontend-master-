import './resultItem.css';
import Card from '../UI/card/Card'
import ResultTime from '../resultTime/ResultTime';

const ResultItem =(props)=> {
  
  return (
  <li>
    <Card className="result-item">
      <ResultTime time={props.time}/>
      <div className="result-item__description">
        <h2>Score: {props.score}/{props.numOfQuestions}</h2>
        
        <div className="result-item__speed"> Speed: {(props.score /60).toFixed(2)} </div>
      </div>
    </Card>
   </li>
  );
}

export default ResultItem;
