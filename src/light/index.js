import React, { useState, useEffect, useCallback } from "react";
import "./light.css";
import Circle from "../circle";
const Timers = {
  oneCycle: 10000,
  halfCycle: 5000,
  reset: 0,
};
const colors = {
  red: "red",
  yellow: "yellow",
  green: "green",
  grey: "grey",
};
const initialState = {
  street_A_Red: colors.grey,
  street_A_Yellow: colors.grey,
  street_A_Green: colors.green,
  street_B_Red: colors.red,
  street_B_Yellow: colors.grey,
  street_B_Green: colors.grey,
  next: "yellow",
};
export default function Light() {
  const [time, setTime] = useState(Timers.reset);
  const [currentLight, setCurrentLight] = useState(initialState);
  const resetTrafficLight = () => {
    setTime(Timers.reset);
    setCurrentLight(initialState);
  };
  const startTrafficLight = () => {
    resetTrafficLight();
    setTime(Timers.oneCycle);
  };

  const handelLightChange = () => {
    switch (currentLight.next) {
      case "red":
        setCurrentLight({
          street_A_Red: colors.red,
          street_A_Yellow: colors.grey,
          street_A_Green: colors.grey,
          street_B_Red: colors.grey,
          street_B_Yellow: colors.grey,
          street_B_Green: colors.green,
          next: "green",
        });
        break;
      case "yellow":
        setCurrentLight({
          street_A_Red: colors.grey,
          street_A_Yellow: colors.yellow,
          street_A_Green: colors.grey,
          street_B_Red: colors.grey,
          street_B_Yellow: colors.yellow,
          street_B_Green: colors.grey,
          next: "red",
        });
        break;
      case "green":
        setCurrentLight({
          street_A_Red: colors.grey,
          street_A_Yellow: colors.grey,
          street_A_Green: colors.green,
          street_B_Red: colors.red,
          street_B_Yellow: colors.grey,
          street_B_Green: colors.grey,
          next: "yellow",
        });

        break;

      default:
        setCurrentLight({
          street_A_Red: colors.grey,
          street_A_Yellow: colors.grey,
          street_A_Green: colors.green,
          street_B_Red: colors.red,
          street_B_Yellow: colors.grey,
          street_B_Green: colors.grey,
          next: "yellow",
        });
    }
    setTime(
      currentLight.next === "red" || currentLight.next === "green"
        ? Timers.oneCycle
        : Timers.halfCycle
    );
  };

  useEffect(() => {
    let timerSub;
    if (time > 0) {
      timerSub = setTimeout(() => {
        handelLightChange();
      }, time);
    } else {
      clearTimeout(timerSub);
    }

    return () => {
      clearTimeout(timerSub);
    };
  }, [time, currentLight]);

  return (
    <div className="traffic-system">
      <div className="street-a">
        <div className="street-a-content street-a-top">
          <div className="street-lane lane-a">
            <div className="traffic-light">
              <Circle color={currentLight.street_A_Red} />
              <Circle color={currentLight.street_A_Yellow} />
              <Circle color={currentLight.street_A_Green} />
            </div>
          </div>
        </div>
      </div>
      <div className="street-b">
        <div className="street-lane-b lane-b">
          <div className="traffic-light">
            <Circle color={currentLight.street_B_Red} />
            <Circle color={currentLight.street_B_Yellow} />
            <Circle color={currentLight.street_B_Green} />
          </div>
          <div className="controls">
            <button className="start" onClick={startTrafficLight}>
              start
            </button>
            <button className="reset" onClick={resetTrafficLight}>
              reset
            </button>
          </div>
          <div className="traffic-light">
            <Circle color={currentLight.street_B_Red} />
            <Circle color={currentLight.street_B_Yellow} />
            <Circle color={currentLight.street_B_Green} />
          </div>
        </div>
      </div>

      <div className="street-a">
        <div className="street-a-content">
          <div className="street-lane lane-a bottom-lane">
            <div className="traffic-light">
              <Circle color={currentLight.street_A_Red} />
              <Circle color={currentLight.street_A_Yellow} />
              <Circle color={currentLight.street_A_Green} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
