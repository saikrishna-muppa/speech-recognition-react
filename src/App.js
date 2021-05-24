import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [text, setText] = useState("");
  const [randomNumber, setRandomNumber] = useState(randomNumberGenerator());
  const [result, setResult] = useState("");
  const [score, setScore] = useState(0);
  window.SpeechRecognition =
    window.webkitSpeechRecognition || window.SpeechRecognition;

  let recognition = new window.SpeechRecognition();

  recognition.start();
  useEffect(() => {
    if (Number(text) === randomNumber) {
      setResult(
        `Congratulations, you're a literate and you know how to read numbers.`
      );
      setScore(score + 1);
      setRandomNumber(randomNumberGenerator());
    }
    return () => setResult("");
  }, [text]);

  // useEffect(() => {
  recognition.addEventListener("result", (e) => {
    console.log({ event: e });
    setText(e.results[0][0].transcript);
  });
  // });

  // recognition.addEventListener("result", (e) => {
  //   console.log({ event: e.results[0][0].transcript });
  //   setText(e.results[0][0].transcript);
  // });

  // useEffect(() =>
  //   // recognition.addEventListener("end", (e) => recognition.start())
  // );

  function randomNumberGenerator() {
    return Math.floor(Math.random() * 100);
  }

  return (
    <div className="App">
      <h1>Text</h1>
      <h4>Score:{score}</h4>
      {result ? (
        <div>{result}</div>
      ) : (
        <div>
          <p>{text}</p>
          <div>Number: {randomNumber}</div>
        </div>
      )}
      <button onClick={() => setRandomNumber(randomNumberGenerator())}>
        Change Number
      </button>
    </div>
  );
}
