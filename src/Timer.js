function Timer(props) {
  return <span ref={props.timerRef} className="spanTimer text-[50px] font-mono font-bold text-[#202020] ">{props.time}</span>;
}

export default Timer;
