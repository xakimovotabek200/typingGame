import React from "react";
import Timer from "./Settime";

export default class App extends React.Component {
  constructor() {
    super();
    let text = `Nineteen Eighty-Four: A Novel, often published as 1984, is a dystopian novel by English novelist George Orwell. It was published on 8 June 1949 by Secker & Warburg as Orwell's ninth and final book completed in his lifetime. Thematically, Nineteen Eighty-Four centres on the consequences of totalitarianism, mass surveillance, and repressive regimentation of all persons and behaviours within society.[2][3] Orwell, himself a democratic socialist, modeled the authoritarian government in the novel after Stalinist Russia.[2][3][4] More broadly, the novel examines the role of truth and facts within politics and the ways in which they are manipulated.`;
    let chars = text.split("").slice(0, 280);
    let styledChars = chars.map((char, index) => (
      <span key={index}>{char}</span>
    ));
    this.state = {
      chars: chars,
      text: styledChars,
      
      currentIndex: 0
    };
    
    
    this.escFunction = this.escFunction.bind(this);
    this.handleNewLetter = this.handleNewLetter.bind(this);
    this.handleBackspace = this.handleBackspace.bind(this);
  }
  
  // const setTimer = () => {
  //   const now = Date.now();
  //   const seconds = now + duration * 1000;
  //   interval = setInterval(() => {
  //     const secondLeft = Math.round((seconds - Date.now()) / 1000);
  //     setDuration(secondLeft);
  //     if (secondLeft === 0) {
  //       handleEnd();
  //     }
  //   }, 1000);
  // };

  escFunction(event) {
    if (event.key === "Shift") return;


    if (event.key === "Backspace") {
      this.handleBackspace();
      return;
    } else {
      this.handleNewLetter(event);
    }
  }

  handleNewLetter(event) {
    this.setState((prevState) => {
      let currentChar = prevState.chars[prevState.currentIndex];
      console.log("expected: ", currentChar, " received:", event.key);

      let newCharState = prevState.text.map((char, index) => {
        if (index !== prevState.currentIndex) return char;

        let styleClass = event.key === currentChar ? "Correct" : "Incorrect";
        return (
          <span key={index} className={styleClass}>
            {char}
          </span>
        );
      });

      return {
        chars: prevState.chars,
        text: newCharState,
        currentIndex: prevState.currentIndex + 1
      };
    });
  }

  handleBackspace() {
    this.setState((prevState) => {
      let newCharState = prevState.text.map((char, index) => {
        if (index !== prevState.currentIndex - 1) {
          return char;
        } else {
          let currentChar = prevState.chars[prevState.currentIndex - 1];
          return (
            <span key={index} className={null}>
              {currentChar}
            </span>
          );
        }
      });

      return {
        chars: prevState.chars,
        text: newCharState,
        currentIndex: Math.max(prevState.currentIndex - 1, 0)
      };
    });
  }

  componentDidMount() {
    document.addEventListener("keydown", this.escFunction, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.escFunction, false);
  }

  render() {
    return (
      <div
        className="App"
        style={{ width: "Min(70ch, 90%)", margin: "0 auto" }}>
        <audio
          id="keyboard-audio"
          src="https://au0diotrimmer.com/download.php?date=09&file=Keyboard-Button-Click-02-c-FesliyanStudios.com-%5BAudioTrimmer.com%5D.mp3"
          preload="auto"></audio>
        <h1>Hello Code</h1>
        <h2
          style={{
            color: "#555555"
          }}>
          {this.state.text}
        </h2>
        <Timer />
      </div>
    );
  }
}
