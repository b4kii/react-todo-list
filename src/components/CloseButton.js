import React from "react";

export default function CloseButton(props) {
  return (
    <div
      id="hamburger"
      className="hamburger"
      onClick={() => {
        props.setDisplaySidebar(current => !current)
      }}
      style={{
        transform: props.displaySidebar ? "translateX(7px)" : "translateX(0)",
      }}
    >
      <div className="hamburger-wrapper">
        <div
          id="first-block"
          className="first-block"
          style={{
            transform: props.displaySidebar
              ? "rotate(45deg) translateY(9px)"
              : "rotate(0)",
          }}
        ></div>
        <div
          id="second-block"
          className="second-block"
          style={{
            transform: props.displaySidebar
              ? "rotate(-45deg) translateY(-9px)"
              : "rotate(0)",
          }}
        ></div>
      </div>
    </div>// 
  );
}
