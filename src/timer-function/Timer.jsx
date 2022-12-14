import { useState, useEffect, useRef } from "react";
import TimerUi from "./TimerUi";
// import {updateTimer} from './UpdateTimer.js';
const initialTime = {
  seconds: "00",
  minutes: "00",
  hours: "00",
  days: "00",
};
export default function Timer() {
  const [time, setTime] = useState(initialTime);
  const [dateInput, setDateInput] = useState("2023-06-19");

  const countDownDate = new Date(dateInput).getTime();
  const todayDate = new Date().getTime();
  const dateInterval = countDownDate - todayDate;

  const showInput = (e) => {
    setDateInput(e.target.value);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(updateTimer(dateInterval));
    }, 1000);
    return () => clearInterval(interval);
  }, [dateInterval]);

  const {seconds, minutes, hours, days} = time
  return (
    <div>
      {dateInterval < 0 ? (
        <TimerUi sec={"00"} min={"0"} hour={"0"} day={"00"} dateVal={"00"} dateChange={showInput}/>
      ) : (
        <TimerUi sec={seconds} min={minutes} hour={hours} day={days} dateVal={dateInput} dateChange={showInput}/>
      )}
    </div>
  );
}

function updateTimer(countDown) {
  return {
    seconds: convertSecond(countDown),
    minutes: convertMin(countDown),
    hours: convertHr(countDown),
    days: convertDay(countDown),
  };
}

function convertSecond(countDown) {
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);
  return addWithZeros(seconds, 2);
}
function convertMin(countDown) {
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  return addWithZeros(minutes, 2);
}
function convertHr(countDown) {
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  return addWithZeros(hours, 2);
}
function convertDay(countDown) {
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  return days.toString();
}
function addWithZeros(number, minLength) {
  const numberString = number.toString();
  if (numberString.length >= minLength) return numberString;
  return "0".repeat(minLength - numberString.length) + numberString;
}
