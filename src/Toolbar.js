function Toolbar(props) {
  const changeTime = (evet) => {
    props.setTime(evet.target.value);
  };

  return (
    <input
      className="timeInput p-2 w-[100px] border-2 rounded-[10px] border-solid border-black focus:outline-none"
      type="number"
      onChange={changeTime}
      placeholder="Time"
    />
  );
}

export default Toolbar;
