import { useEffect, useState } from "react";
import Click from "./Click";
import "./tailwind.css";
import Timer from "./Timer";
import Toolbar from "./Toolbar";

function App() {
  const [status, setStatus] = useState(0);
  const [time, setTime] = useState(0);
  const [count, setCount] = useState(0);
  var timerInterval;

  const startClicker = () => {
    if (time > 0) setStatus(1);
  };

  useEffect(() => {
    if (status === 1) {
      timerInterval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timerInterval);
    }
  }, [status, timerInterval]);

  useEffect(() => {
    if (time === 0 && status === 1) {
      setStatus(2);
    }
  }, [time, status, setStatus]);

  const clicked = () => {
    if (status === 1) {
      setCount(count + 1);
    }
  };

  const changeTime = (event) => {
    setTime(event.target.value);
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
        return <Toolbar setTime={setTime} />;
      case 1:
        return <Timer time={time} />;
      case 2:
        return (
          <span
            onClick={() => {
              restart();
            }}
            className="text-[30px] font-mono font-bold cursor-pointer"
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
      {status === 0 ? (
        <div
          onClick={() => {
            startClicker();
          }}
          className="flex-1 grow grid place-content-center select-none cursor-pointer text-[200px] font-mono font-bold font-outline-5 text-white "
        >
          Start
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
