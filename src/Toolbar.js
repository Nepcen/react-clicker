function Toolbar(props) {
  const changeTime = (evet) => {
    props.setTime(evet.target.value);
  };

  return (
    <input
      className="p-1 border-2 border-solid border-black"
      type="number"
      onChange={changeTime}
      placeholder="Time"
    />
  );
}

export default Toolbar;
