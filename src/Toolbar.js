function Toolbar(props) {
  const changeTime = (event) => {
    props.setTime(event.target.value);
    localStorage.setItem("lastTime", event.target.value)
  };

  return (
    <input
      ref={props.inputRef}
      className="timeInput bg-[#202020] text-white p-2 m-[5px] w-[100px] border-2 rounded-[10px] border-solid border-black text-center animate-[rainbow-border_10s_linear_infinite] placeholder:text-center focus:outline-none"
      type="number"
      value={localStorage.getItem("lastTime") || ""}
      onChange={changeTime}
      placeholder="Time"
    />
  );
}

export default Toolbar;
