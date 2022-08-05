import React, { useContext } from "react";
import TogglButton from "react-toggle-button";
import ReactSwitch from "react-switch";

import { ThemeContext } from "../App";

import { useState } from "react";

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
          checkedIcon={false}
          uncheckedIcon={false}
        />
      </div>
    </div>
  );
}
