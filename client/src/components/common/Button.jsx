function Buttons({ className, handleClick, buttonlabel }) {
  return (
    <button className={`btn ${className}`} onClick={handleClick}>
      {buttonlabel || "button"}
    </button>
  );
}

export default Buttons;
