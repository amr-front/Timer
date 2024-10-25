// buttons
let Start = document.getElementById("Start");
let Save = document.getElementById("save");
let Stop = document.getElementById("stop");

let auto = new Audio("digital-alarm-clock-151920.mp3");

function Done() {
  auto.play();
}

function CheckButn() {
  auto.pause();
}

// The Review
let Time_in_Hour = document.querySelector(".hour");
let Time_in_Minute = document.querySelector(".minute");
let Time_in_Second = document.querySelector(".second");

// The Set Element , Section
let setTime = document.querySelector(".settimer");

let input = document.querySelectorAll("input");

for (let i = 0; i < input.length; i++) {
  // Some Friendly Scroll And Set The Biggest Value
  input[i].addEventListener("input", () => {
    if (input[i].value.length >= 2) {
      if (input[i].value > 59) {
        input[i].value = 59;
      } else if (input[i].value < 0) {
        input[i].value = 1;
      } else {
        input[i].blur();
        if (i !== input.length - 1) {
          // If This Is The Last Element Stop Scrolling
          input[i + 1].focus();
        }
      }
    }
  });
}

// Inputs
let Hours_value = document.getElementById("hours");
let minutes_value = document.getElementById("minutes");
let seconds_value = document.getElementById("seconds");

// Values
let Hour = Time_in_Hour.firstElementChild;
let Minute = Time_in_Minute.firstElementChild;
let Sec = Time_in_Second.firstElementChild;

function sendValue(elm, val, type) {
  if (val.length < 1) {
    // Check  If the Value Count Is Smaller Than 1
    elm.textContent = `00`;
  } else if (val.length === 1) {
    sessionStorage.setItem(type, `0` + val); // Saving The Value
    elm.textContent = sessionStorage.getItem(type);
  } else {
    sessionStorage.setItem(type, val);
    elm.textContent = sessionStorage.getItem(type);
  }
}

function res(elm) {
  // Set The Values When Click
  elm.textContent = `00`;
}

function SaveVal(Name, value) {
  return sessionStorage.setItem(Name, value);
}

function TimerP(va) {
  return clearInterval(va);
}

let y;
function second() {
  // Close The Second Timer
  clearInterval(y);
  y = setInterval(() => {
    let s = "59";
    // if the Second is Empty
    if (parseInt(Sec.textContent) === 0) {
      // if The Minute are Not Empty
      if (parseInt(Minute.textContent) !== 0) {
        Minute.textContent -= 1; // Take 1 Form The Minutes
        Sec.textContent = s; // Set The Seconds To 59 > 1 min = 60 Sec

        // Saving
        SaveVal("m", Minute.textContent);
        SaveVal("s", Sec.textContent);
        // if  The Hours Are Not Empty
      } else if (parseInt(Hour.textContent) !== 0) {
        Hour.textContent -= 1; // Take 2 From The Hours
        Minute.textContent = s; // Set The  Min To 59 > 1h = 60 min = 60 min
        Sec.textContent = s; // Set the Min
        // Saving

        SaveVal("m", Minute.textContent);
        SaveVal("h", Hour.textContent);
        SaveVal("s", Sec.textContent);
      }
      // Check If The Timer Is = "0"
      else {
        // ReSet The Values To The Default
        res(Hour);
        res(Minute);
        res(Sec);
        // Saving
        SaveVal("m", Minute.textContent);
        SaveVal("h", Hour.textContent);
        SaveVal("s", Sec.textContent);
        // Stop The Timer
        TimerP(y);
      }
    }
    // Else The Sec Has A Number
    else {
      Sec.textContent -= 1; // Take 1 From THe Seconds
      SaveVal("s", Sec.textContent);
      // Checking  If  The Timer Is Empty
      if (
        parseInt(Sec.textContent) === 0 &&
        parseInt(Minute.textContent) === 0 &&
        parseInt(Hour.textContent) === 0
      ) {
        res(Hour);
        res(Minute);
        res(Sec);

        SaveVal("m", Minute.textContent);
        SaveVal("h", Hour.textContent);
        SaveVal("s", Sec.textContent);
        // Stop The Timer
        TimerP(y);
        Done();
        Stop.style.backgroundColor = "#48b02c";
      }
    }
  }, 1000);
}

Start.addEventListener("click", () => {
  sessionStorage.clear();
  res(Hour);
  res(Minute);
  res(Sec);

  setTime.style.cssText = "transform: translateY(0px); opacity : 1";

  Hours_value.value = "00";
  minutes_value.value = "00";
  seconds_value.value = "00";
});

Save.addEventListener("click", function () {
  sendValue(Hour, Hours_value.value, "h");
  sendValue(Minute, minutes_value.value, "m");
  sendValue(Sec, seconds_value.value, "s");

  second();

  setTime.style.cssText = "transform: translateY(-150px);opacity: 0;";
});

Stop.addEventListener("click", function () {
  CheckButn();
  Stop.style.cssText = "background-color : #48b4b4;";
});

function check(type, elm) {
  if (sessionStorage.getItem(type)) {
    elm.textContent = sessionStorage.getItem(type);
  }
}

check("h", Hour);
check("m", Minute);
check("s", Sec);

second();
