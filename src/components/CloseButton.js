import React from "react";

export default function CloseButton (props) {

  return (
      <div id="hamburger" className="hamburger" onClick={props.showSideBar}>
        <div className="hamburger-wrapper">
          <div id="first-block" className="first-block"></div>
          <div id="second-block" className="second-block"></div>
        </div>
      </div>
  );
}