import { useEffect, useRef, useState } from "react";
import sync from 'css-animation-sync';
import "./tailwind.css";
import Click from "./Click";
import Timer from "./Timer";
import Toolbar from "./Toolbar";

function App() {
  const [status, setStatus] = useState(0)
  const [time, setTime] = useState(0)
  const [count, setCount] = useState(0)
  const inputRef = useRef()
  var timerInterval

  const startClicker = () => {
    if (time > 0) setStatus(1)
    else{
      inputRef.current.focus()
      inputRef.current.classList.add("up-and-down")
      setTimeout(() => {
        inputRef.current.classList.remove("up-and-down")
      }
      , 500);

    }
  };

  useEffect(() => {
    if (status === 1) {
      sync("rainbow-text-shadow")
      sync("rainbow-border")
      sync("rainbow-box-shadow")
      timerInterval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timerInterval);
    }
  }, [status, timerInterval])

  useEffect(() => {
    if (time === 0 && status === 1) {
      setStatus(2);
    }
  }, [time, status, setStatus])

  const clicked = () => {
    if (status === 1) {
      setCount(count + 1)
    }
  };

  const restart = () => {
    setStatus(0);
    setTime(0);
    setCount(0);
    clearInterval(timerInterval)
  };

  const renderBottom = () => {
    switch (status) {
      case 0:
        return <Toolbar inputRef={inputRef} setTime={setTime} />
      case 1:
        return <Timer time={time} />
      case 2:
        return (
          <span
            onClick={() => {
              restart()
            }}
            className="animate-[rainbow-text-shadow_10s_linear_infinite] lg:text-[50px] md:text-[40px] text-[30px] font-mono font-bold cursor-pointer text-[#202020]"
          >
            Restart
          </span>
        );
      default:
        return "Something went wrong"
    }
  };

  return (
    <div className="flex flex-col w-full h-full ">
      <div className="flex flex-row items-center justify-center w-full">
      </div>
      {status === 0 ? (
        <div
          onClick={() => {
            startClicker()
          }}
          className=" flex-1 grow grid place-content-center select-none cursor-pointer lg:text-[200px] md:text-[150px] min-[580px]:text-[130px] text-[75px] font-mono font-bold font-outline-5 text-[#202020] "
        >
          <span className="animate-[rainbow-text-shadow_10s_linear_infinite]">Start</span>
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
