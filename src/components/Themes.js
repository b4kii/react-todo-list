import React, { useContext } from "react";
import ReactSwitch from "react-switch";

import { ThemeContext } from "../App";

export default function Themes() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div className="theme-mode-wrapper">
      <h2>Color mode: </h2>
      <div className="theme-button">
        {/* 🌞 */}
        {/* 🌙	 */}
        <ReactSwitch
          onChange={toggleTheme}
          checked={theme === "dark"}
          offColor="#181818"
          onColor="#f0e68c"
          // checkedIcon={false}
          checkedIcon="🌞"
          // uncheckedIcon={false}
          uncheckedIcon="🌔"
        />
      </div>
    </div>
  );
}
