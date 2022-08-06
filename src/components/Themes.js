import React, { useContext } from "react";
import ReactSwitch from "react-switch";

import { ThemeContext } from "../App";

export default function Themes() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div className="theme-mode-wrapper">
      <h2>Color mode: </h2>
      <div className="theme-button">
        <ReactSwitch
          onChange={toggleTheme}
          checked={theme !== "dark"}
          offColor="#f5dfa8"
          onColor="#181818"
          offHandleColor="#181818"
          onHandleColor="#f5dfa8"
          checkedIcon={false}
          uncheckedIcon={false}
        />
      </div>
    </div>
  );
}
