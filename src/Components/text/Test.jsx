import React from "react";

export default class Text extends React.Component {
  constructor() {
    super();
    let text = `Nineteen Eighty-Four: A Novel, often published as 
    1984, is a dystopian novel by English novelist George Or
    well. 
    It was published on 8 June 1949 by Secker & Warburg as Orwell's ninth and final book completed in his lifetime. Thematically, 
     Nineteen Eighty-Four centres on the consequences of totalitarianism, 
     mass surveillance, and repressive regimentation of all persons and 
     behaviours within society.[2][3] Orwell, himself a democratic socialist, 
     modeled the authoritarian government in the novel after Stalinist Russia.
     [2][3][4] More broadly, the novel examines the role of truth and facts within 
     politics and the ways in which they are manipulated.`;
    let chars = text.split("").slice(0, 5);
    let styledChars = chars.map((char, index) => (
      <span key={index}>{char}</span>
    ));
    this.state = {
      chars: chars,
      text: styledChars,
      currentIndex: 0,
      elapsedTime: 0, // Initializ time to 0
      isTypingStarted: false, // Flag to track if typing has started
      correctCount: 0, // Number of correctly typed characters
      totalCount: 0, // Total number of typed characters
    };

    this.escFunction = this.escFunction.bind(this);
    this.handleNewLetter = this.handleNewLetter.bind(this);
    this.handleBackspace = this.handleBackspace.bind(this);
  }

  escFunction(event) {
    if (event.key === "Shift") return;

    if (event.key === "Backspace") {
      this.handleBackspace();
      return;
    } else {
      // Check if typing has started
      if (!this.state.isTypingStarted) {
        // Start the timer
        this.startTime = Date.now();
        this.timer = setInterval(() => {
          const currentTime = Date.now();
          const elapsedTime = Math.floor((currentTime - this.startTime) / 1000);
          this.setState({ elapsedTime });
        }, 60);

        // Set typing started flag to true
        this.setState({ isTypingStarted: true });
      }

      this.handleNewLetter(event);
    }
  }

  handleNewLetter(event) {
    this.setState((prevState) => {
      let currentChar = prevState.chars[prevState.currentIndex];

      let newCharState = prevState.text.map((char, index) => {
        if (index !== prevState.currentIndex) return char;

        let styleClass = "";
        if (index < prevState.currentIndex) {
          styleClass = "Correct";
        } else if (index === prevState.currentIndex) {
          styleClass = event.key === currentChar ? "Correct" : "Incorrect";
        }

        return (
          <span key={index} className={styleClass}>
            {char}
          </span>
        );
      });

      // Check if typing has reached the end
      if (prevState.currentIndex === prevState.chars.length - 1) {
        // Stop the timer
        clearInterval(this.timer);

        // Calculate statistics
        const totalCount = prevState.chars.length;
        const correctCount = prevState.chars.filter(
          (char, index) => prevState.text[index].props.className === "Correct"
        ).length;

        this.setState({ totalCount, correctCount });
      }

      return {
        chars: prevState.chars,
        text: newCharState,
        currentIndex: prevState.currentIndex + 1,
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
        currentIndex: Math.max(prevState.currentIndex - 1, 0),
      };
    });
  }

  componentDidMount() {
    document.addEventListener("keydown", this.escFunction, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.escFunction, false);

    // Stop the timer
    clearInterval(this.timer);
  }

  render() {
    const accuracy = this.state.totalCount
      ? (this.state.correctCount / this.state.totalCount) * 100
      : 0;
    const speed = this.state.elapsedTime
      ? Math.floor(this.state.totalCount / this.state.elapsedTime)
      : 0;

    return (
      <div
        className="App"
        style={{ width: "Min(70ch, 90%)", margin: "0 auto" }}
      >
        <audio
          id="keyboard-audio"
          src="https://au0diotrimmer.com/download.php?date=09&file=Keyboard-Button-Click-02-c-FesliyanStudios.com-%5BAudioTrimmer.com%5D.mp3"
          preload="auto"
        ></audio>
        <h1>Hello Code</h1>
        <h2
          className="border-4 border-purple-500 rounded-lg p-4 text-2xl font-bold text-gray-700 bg-gradient-to-r from-purple-500 to-indigo-500 "
          style={{
            color: "#555555",
          }}
        >
          {this.state.text}
        </h2>
        {this.state.totalCount > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-blue-500">
              Elapsed Time: {this.state.elapsedTime} seconds
            </h3>
            <h3 className="text-2xl font-bold text-[#11009E]">
              Accuracy: {accuracy.toFixed(2)}%
            </h3>
            <h3 className="text-2xl font-bold text-green-500">
              Speed: {speed} characters per second
            </h3>
          </div>
        )}
      </div>
    );
  }
}
