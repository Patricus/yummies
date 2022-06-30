import React, { useEffect, useState } from "react";
import github from "../images/github.png";
import linkedin from "../images/linkedin.png";
import "./aboutMe.css";

function AboutMe() {
  return (
    <footer>
      <div className="center">
        <h2>Patrick McPherson</h2>
      </div>
      <div className="center">
        <a href="https://github.com/Patricus">
          Git Hub
          <div>
            <img src={github} />
          </div>
        </a>
        <a href="https://www.linkedin.com/in/patrick-mcpherson-438385117/">
          Linked In
          <div>
            <img src={linkedin} />
          </div>
        </a>
      </div>
    </footer>
  );
}

export default AboutMe;
