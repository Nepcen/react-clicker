import { useEffect, useRef, useState } from "react";
import { syncEffects, updateHighScore } from "./utils";
import "./tailwind.css";
import Click from "./Click";
import Timer from "./Timer";
import Toolbar from "./Toolbar";

function App() {
  const [status, setStatus] = useState(0);
  const [time, setTime] = useState(localStorage.getItem("lastTime") || 0);
  const [count, setCount] = useState(0);
  const inputRef = useRef();
  const timerRef = useRef();
  var timerInterval;

  var scores = JSON.parse(localStorage?.getItem("highScores"));
  var cScore = scores?.filter((el) => {
    return el.time == localStorage?.getItem("lastTime");
  })[0];

  const startClicker = () => {
    if (time > 0 || localStorage.getItem("lastTime") > 0) {
      if (!localStorage.getItem("highScores"))
        localStorage.setItem("highScores", JSON.stringify([]));

      setTime(localStorage.getItem("lastTime"));
      setCount(count + 1);
      setStatus(1);

    } else {
      inputRef.current.focus();
      inputRef.current.classList.add("up-and-down");
      
      setTimeout(() => {
        inputRef.current.classList.remove("up-and-down");
      }, 500);
      
    }
  };

  useEffect(() => {
    syncEffects();
    if (status === 1) {
      timerInterval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timerInterval);
    }
  }, [status]);

  useEffect(() => {
    syncEffects();
    
    if (time === 0 && status === 1) {
      timerRef.current.classList.remove("lastTen");
      if (!cScore) {
        scores?.push({
          time: parseInt(localStorage?.getItem("lastTime")),
          score: count,
        });

        localStorage.setItem("highScores", JSON.stringify(scores));
      } else if (cScore.score < count) {
        updateHighScore(scores, count);
      }

      setStatus(2);
    } else if (time <= 10 && status === 1) {
      timerRef.current.classList.add("lastTen");
    } 
    
    if (time > 0 && status === 1 && cScore?.score < count){
      updateHighScore(scores, count);
    }
  });

  const clicked = () => {
    if (status === 1) {
      setCount(count + 1);
    }
  };

  const restart = () => {
    setStatus(0);
    setTime(0);
    setCount(0);
    clearInterval(timerInterval);
  };

  const renderBottom = () => {
    switch (status) {
      case 0:
        return <Toolbar inputRef={inputRef} setTime={setTime} />;
      case 1:
        return <Timer time={time} timerRef={timerRef} />;
      case 2:
        return (
          <span
            onClick={() => {
              restart();
            }}
            className="animate-[rainbow-text-shadow_10s_linear_infinite] lg:text-[50px] md:text-[40px] text-[30px] font-mono font-bold cursor-pointer text-[#202020]"
          >
            Restart
          </span>
        );
      default:
        return "Something went wrong";
    }
  };

  return (
    <div className="flex flex-col w-full h-full ">
      {cScore ? (
        <div className=" flex flex-col items-center justify-center w-full animate-[rainbow-text-shadow_10s_linear_infinite] lg:text-[50px] md:text-[40px] min-[375px]:text-[25px] text-[20px] text-center font-mono font-bold cursor-pointer text-[#202020]">
          <span className=" ">High Score of {cScore.time}s </span>
          <span>{cScore.score}</span>
        </div>
      ) : (
        <div className=" invisible flex flex-col items-center justify-center w-full animate-[rainbow-text-shadow_10s_linear_infinite] lg:text-[50px] md:text-[40px] text-[30px] font-mono font-bold cursor-pointer text-[#202020]">
          <span>Best Score of s </span>
          <span>10</span>
        </div>
      )}
      <div className="flex flex-row items-center justify-center w-full"></div>
      {status === 0 ? (
        <div
          onClick={() => {
            startClicker();
          }}
          className=" flex-1 grow grid place-content-center select-none cursor-pointer lg:text-[200px] md:text-[150px] min-[580px]:text-[130px] text-[75px] font-mono font-bold font-outline-5 text-[#202020] "
        >
          <span className="animate-[rainbow-text-shadow_10s_linear_infinite]">
            Start
          </span>
        </div>
      ) : (
        <Click clicked={clicked} count={count} />
      )}
      <div className="flex flex-row items-center justify-center w-full">
        {renderBottom()}
      </div>
    </div>
  );
}

export default App;
