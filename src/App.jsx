import "./App.css";
import Banner from "./components/header";
import Board from "./components/board";
import { useEffect, useState } from "react";
import RulesBox from "./components/rulesBox";

function App() {
  const [rules, setRules] = useState(false);
  const [score, setScore] = useState(0);
  useEffect(() => {
    if (localStorage.getItem("score")) setScore(localStorage.getItem("score"))
  }, [])

  useEffect(() => {
    // console.log("rules : ", rules);
  }, [rules])
  return (
    <div className="container">
      <Banner score={score} />
      <Board showRulesBox={setRules} setScore={setScore} score={score} />
      <RulesBox setrules={setRules} showRules={rules} />
    </div>
  );
}

export default App;
