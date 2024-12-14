import { useState } from "react";
import "./App.css";
import { kebabToTitleCase } from "./helpers";
function App() {
  const [color, setColor] = useState("medium-violet-red");
  const [checked, setChecked] = useState(false);
  const [prevColor, setPrevColor] = useState(color);
  function onClick() {
    setColor(prevColor =>
      prevColor === "medium-violet-red" ? "midnight-blue" : "medium-violet-red"
    );
  }

  return (
    <div>
      <button className={color} onClick={onClick} disabled={checked}>
        Change to{" "}
        {color === "medium-violet-red"
          ? kebabToTitleCase("midnight-blue")
          : kebabToTitleCase("medium-violet-red")}
      </button>
      <br />
      <input
        type='checkbox'
        id='disable-button-checkbox'
        defaultChecked={false}
        onChange={() => {
          if (!checked) {
            setPrevColor(color);
            setChecked(true);
            setColor("gray");
          } else {
            setColor(prevColor);
            setChecked(false);
          }
        }}
      />
      <label htmlFor='disable-button-checkbox'>Disable Button</label>
    </div>
  );
}

export default App;
