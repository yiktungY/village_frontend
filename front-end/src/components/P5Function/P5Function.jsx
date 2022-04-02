import React from "react";
import Sketch from "react-p5";

function P5Sketch(props) {
  let x = 50;
  let y = 50;

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(500, 500).parent(canvasParentRef);
    p5.fill();
  };

  const draw = (p5) => {
    p5.mouseClicked();
  };
  return <Sketch setup={setup} draw={draw} />;
}

export default P5Sketch;
