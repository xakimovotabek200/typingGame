import { useEffect, useRef, useState } from "react";
import { allowedKeys, quotesArray, random } from "./Helper";
import ItemList from "./ItemList";
let interval = null;

const Test = () => {
  const inputRef = useRef(null);
  const outputRef = useRef(null);
  const [duration, setDuration] = useState(60);
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);
  const [index, setIndex] = useState(0);
  const [correctIndex, setCorrectIndex] = useState(0);
  const [errorIndex, setErrorIndex] = useState(0);
  const [quote, setQuote] = useState({});
  const [input, setInput] = useState("");
  const [cpm, setCpm] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [isError, setIsError] = useState(false);
  const [lastScore, setLastScore] = useState("0");

  useEffect(() => {
    const newQuote = random(quotesArray);
    setQuote(newQuote);
    setInput(newQuote.quote);
  }, []);

  const handleEnd = () => {
    setEnded(true);
    setStarted(false);
    clearInterval(interval);
  };

  const setTimer = () => {
    const now = Date.now();
    const seconds = now + duration * 1000;
    interval = setInterval(() => {
      const secondLeft = Math.round((seconds - Date.now()) / 1000);
      setDuration(secondLeft);
      if (secondLeft === 0) {
        handleEnd();
      }
    }, 1000);
  };

  const handleStart = () => {
    setStarted(true);
    setEnded(false);
    setInput(quote.quote);
    inputRef.current.focus();
    setTimer();
  };

  const handleKeyDown = (e) => {
    e.preventDefault();
    const { key } = e;
    const quoteText = quote.quote;

    if (key === quoteText.charAt(index)) {
      setIndex(index + 1);
      const currenChar = quoteText.substring(
        index + 1,
        index + quoteText.length
      );
      setInput(currenChar);
      setCorrectIndex(correctIndex + 1);
      setIsError(false);
      outputRef.current.innerHTML += key;
    } else {
      if (allowedKeys.includes(key)) {
        setErrorIndex(errorIndex + 1);
        setIsError(true);
        outputRef.current.innerHTML += `<span class="text-danger">${key}</span>`;
      }
    }

    const timeRemains = ((60 - duration) / 60).toFixed(2);
    const _accuracy = Math.floor(((index - errorIndex) / index) * 100);
    const _wpm = Math.round(correctIndex / 5 / timeRemains);

    if (index > 5) {
      setAccuracy(_accuracy);
      setCpm(correctIndex);
      setWpm(_wpm);
    }

    if (index + 1 === quoteText.length || errorIndex > 50) {
      handleEnd();
    }
  };

  useEffect(() => {
    if (ended) localStorage.setItem("wpm", wpm);
  }, [ended, wpm]);
  useEffect(() => {
    const stroedScore = localStorage.getItem("wpm");
    if (stroedScore) setLastScore(stroedScore);
  }, []);
  return (
    <div className="m-8 md: md-0">
      <div className="flex justify-center">
        <div className="col-sm-6 col-md-2 px-5">
          <ul className="list-unstyled text-center small">
            <ItemList name="Timers" data={duration} />
          </ul>
        </div>
        <div className="col-sm-6 col-md-2 px-5">
          <ul className="list-unstyled text-center small">
            <ItemList name="Errors" data={errorIndex} />
          </ul>
        </div>

        <div className="col-sm-6 col-md-2 order-md-2 px-5">
          <ul className="list-unstyled text-center small">
            <ItemList name="Last Score" data={lastScore} />
          </ul>
        </div>
      </div>

      <div className="container-fluid pt-4">
        <div className="row">
          <div className="col-sm-6 col-md-2 order-md-0 px-5">
            <ul className="list-unstyled text-center small"></ul>
          </div>
          {/* Body */}
          <div className="col-sm-12 col-md-8 order-md-1">
            <div className="container">
              <div className="text-center mt-4 header">
                <div className="control my-5">
                  {ended ? (
                    <button
                      className="btn btn-outline-danger btn-circle"
                      onClick={() => window.location.reload()}
                    >
                      Reload
                    </button>
                  ) : started ? (
                    <button
                      className="btn btn-circle btn-outline-success"
                      disabled
                    >
                      Hurry
                    </button>
                  ) : (
                    <button
                      className="btn btn-circle btn-outline-success"
                      onClick={handleStart}
                    >
                      GO!
                    </button>
                  )}
                  <span className="btn-circle-animation" />
                </div>
              </div>

              {ended ? (
                <div className="bg-dark text-light p-4 mt-5 lead rounded">
                  <span>"{quote.quote}"</span>
                  <span className="d-block mt-2 text-muted small">
                    - {quote.author}
                  </span>
                </div>
              ) : started ? (
                <div
                  className={`text-light mono quotes${
                    started ? " active" : ""
                  }${isError ? " is-error" : ""}`}
                  tabIndex="0"
                  onKeyDown={handleKeyDown}
                  ref={inputRef}
                >
                  {input}
                </div>
              ) : (
                <div
                  className="mono quotes text-muted"
                  tabIndex="-1"
                  ref={inputRef}
                >
                  {input}
                </div>
              )}

              <div
                className="p-4 mt-4 bg-dark text-light rounded lead hidden"
                ref={outputRef}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
