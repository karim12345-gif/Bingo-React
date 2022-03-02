import { useState, useEffect } from "react";
import "./styles.css";
import Instructions from "./components/instructions";
import RenderSuccess from "./components/renderSuccess";
import { start } from "./Confettis";


var wonSeries = [[], [], [], [], []];

 function Bingo() {
  // adding the check on id 12 by setting it to true
  const [state, setState] = useState({ checked: { 12: true } });
  // cards 
  const [bingoArray, setArray] = useState([
    { id: 0, value: "child noises in the background" },
    { id: 1, value: "Hello, hello?" },
    { id: 2, value: "I need to jump in another call" },
    { id: 3, value: "Can Everyone Go On Mute" },
    { id: 4, value: "Could you please get closer to the mic" },
    { id: 5, value: "Load Painful Echo/ Feedback" },
    { id: 6, value: "Next Slide Please." },
    { id: 7, value: "can we take this offline" },
    { id: 8, value: "is ____ on call" },
    { id: 9, value: "Could You Share This Slide Afterwards?" },
    { id: 10, value: "can somebody grant presenter rights?" },
    { id: 11, value: "can you email that to everyone" },
    { id: 12, value: "Conf 😷 Call Bingo" },
    { id: 13, value: "Sorry I had problems logging in" },
    { id: 14, value: "(animal noises in the background)" },
    { id: 15, value: "sorry, I didn't found the conference id" },
    { id: 16, value: "I was having connection issues" },
    { id: 17, value: "I'll have to get back to you" },
    { id: 18, value: "who just joined???" },
    { id: 19, value: "Sorry, Something ___ with my calendar" },
    { id: 20, value: "do you see any screen???" },
    { id: 21, value: "let us wait for ____!" },
    { id: 22, value: "you will send the minutes?" },
    { id: 23, value: "sorry, I was on mute" },
    { id: 24, value: "can you repeat please???" },
  ]);


  // confetti function 
  function Confetti() {
    useEffect(() => {
      start();
    });
    return <canvas id="canvas" />;
  }

    // we check if the user hits the rows or columns according to the index,
  //if he/she does then he we wins the game
  const isWon = (checked) => {
    const range = [0, 1, 2,3,4];
      return (
        undefined !==
        range.find(row => range.every(column => checked[row * 5 + column])) || timerFunction() &&
        checkIfStillWon()  ||
      undefined !==
        range.find(column => range.every(row => checked[row * 5 + column])) || timerFunction() &&
        checkIfStillWon() ||
      range.every(index => checked[index * 5 + index]) || timerFunction() &&
      checkIfStillWon() ||
      range.every(index => checked[index * 5 + 4 - index]) || timerFunction() &&
      checkIfStillWon()
      )
  };

  // timer for celebrations 
  const timerFunction = () => {
    let timer;
    clearInterval(timer);
    timer = setTimeout(() => {
      setState((state) => {
        const checked = { ...state.checked };
        const won = false;
        return {
          ...state,
          checked,
          won,
        };
      });
    }, 5000);
  };

  // shuffle array, the id:12 wont change position if we shuffle with the button 
  function shuffleArray ()  {
    setArray(bingoArray.sort(() => Math.random() - 0.5));
    setState({ checked: { 12: true } });
    for (var i = 0; i < bingoArray.length; i++) {
      if (bingoArray[i].id === 12) {
        for (var j = 0; j < bingoArray.length; j++) {
          if (j === 12) {
            let temp = bingoArray[i];
            bingoArray[i] = bingoArray[j];
            bingoArray[j] = temp;
            break;
          }
        }
      }
    }
    for (var k = 0; k < bingoArray.length; k++) {
      bingoArray[k].id = k;
    }
  };
  

  // when the user click on the card objects
  function Tile({ id, children, onToggle, isSet }) {
    return (
      <div onClick={onToggle} className={`tile ${isSet ? "tile--set" : ""}`}>
        {children}
      </div>
    );
  }

  const handleOnclick = (id) => {
      setState((state) => {
        const checked = { ...state.checked, [id]: !state.checked[id] };
        const won = isWon(checked);
        return {
          ...state,
          checked,
          won
        };
      });
    
  }

  // checking if still winning and then we can continue playing 
  const checkIfStillWon = () => {
    wonSeries.forEach((item) => {
      item.forEach((innerItem) => {
        innerItem.forEach((index) => {
          if (state.checked[index] === false) {
            innerItem.forEach((i) => {
              document.getElementById(`tile-${i}`).className = `tile--set ${
                i === 12 ? "tile-12" : ""
              } ${state.checked[i] ? "active" : ""}`;
            });
            innerItem.length = 0;
            return;
          }
        });
      });
    });
  };


  return (
    <div className="App">
      <h1 className="title">
        Hello, this's Bingo....go ahead and start playing<spam>⚡</spam>!
      </h1>
      

      {/* restart button */}
      <h2>
        <button className="restart" onClick={shuffleArray}>New Bingo!</button>
      </h2>
        {/* if the user wins he will get a text to show that he won the game and the confetti along with it */}
        {state.won ? <RenderSuccess /> : null}
        <div className="wrapper">
        {/* mapping the the bingo words and displaying them */}
        {bingoArray.map((item) => {
          return (
            <Tile
              id={item.id}
              key={item.id}
              isSet={!!state.checked[item.id]}
              onMouseUp={() => isWon(state.checked)}
              // when we press the cards we get events and hovers 
              onToggle={() =>  handleOnclick(item.id)}     
            >
              {/* display all json values  */}
              {item.value}
            </Tile>                   
          );
        })} 
        
      </div>
      {/* Instructions component */}
      <Instructions />
       {/* if the user won then we get the celebration other wise we get nothing  */}
       {state.won ? <Confetti  /> : null}
    </div>
  );
}
export default Bingo;