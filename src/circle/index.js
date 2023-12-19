import React from "react";
import "./Circle.css";
function Circle({ color }) {
  return <div className={`lights ${color}`}></div>;
}

export default Circle;
