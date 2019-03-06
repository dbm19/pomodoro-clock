import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class Pomodoro extends React.Component {
  constructor(props) { 
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      minute: ["00", 59, 58, 57, 56, 55, 54, 53, 52, 51, 50, 49, 48, 47, 46, 45, 44, 43, 42, 41, 40, 39, 38, 37, 36, 35, 34, 33, 32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, "09", "08", "07", "06", "05", "04", "03", "02", "01"],
      second: ["00", 59, 58, 57, 56, 55, 54, 53, 52, 51, 50, 49, 48, 47, 46, 45, 44, 43, 42, 41, 40, 39, 38, 37, 36, 35, 34, 33, 32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, "09", "08", "07", "06", "05", "04", "03", "02", "01"],
      minuteIndex: 35,
      secondIndex: 0,
      startOrStop: "Start", //To change the text in the Start button from "Start" to "Stop" when clicked, and vice versa.
      timer: "Off",
      countdownEnd: 0,
      alreadyStarted: false,
      sessionOrBreak: "Session"
    }
    this.reset = this.reset.bind(this);
    this.decrement = this.decrement.bind(this);
    this.increment = this.increment.bind(this);
    this.startStop = this.startStop.bind(this);
    this.countdown = this.countdown.bind(this);
  }
  
  reset() {
    clearTimeout(this.state.countdownEnd);
    this.setState ({
      breakLength: 5,
      sessionLength: 25,
      minuteIndex: 35, 
      secondIndex: 0,
      startOrStop: "Start",
      timer: "Off",
      alreadyStarted: false,
      sessionOrBreak: "Session"
    })
    let sound = document.getElementById("beep");
    sound.pause();
    sound.currentTime = 0;
  }
  
  decrement(e) {
    if (e == "b" && this.state.breakLength != 1) {
      this.setState ({
        breakLength: this.state.breakLength - 1
      })
    }
    else if (e == "s" && this.state.sessionLength != 1) {
      this.setState ({
        sessionLength: this.state.sessionLength - 1,
        minuteIndex: this.state.minuteIndex + 1
      })
    }
  }
  
  increment(e) {
    if (e == "b" && this.state.breakLength != 60) {
      this.setState ({
        breakLength: this.state.breakLength + 1
      })
    }
    else if (e == "s" && this.state.sessionLength != 60){
      this.setState ({
        sessionLength: this.state.sessionLength + 1,
        minuteIndex: this.state.minuteIndex - 1
      })
    }
  }
  
  countdown() {
    if (this.state.secondIndex == 0 && this.state.minuteIndex < 59 && this.state.minuteIndex != 0) {
      this.setState ({
        minuteIndex: this.state.minuteIndex + 1,
        secondIndex: this.state.secondIndex + 1
      })
    }
    else if (this.state.minuteIndex == 59 && this.state.secondIndex == 0) {
      this.setState ({
        minuteIndex: 0,
        secondIndex: this.state.secondIndex + 1
      })
    }
    else if (this.state.secondIndex != 0 && this.state.secondIndex != 59) {
      this.setState ({
        secondIndex: this.state.secondIndex + 1
      })
    }
    else if (this.state.secondIndex == 59) {
      this.setState ({
        secondIndex: 0
      })
    }
    else if (this.state.secondIndex == 0 && this.state.minuteIndex == 0 && this.state.sessionOrBreak == "Session") {
      let sound = document.getElementById("beep");
      sound.play();
      this.setState ({
        sessionOrBreak: "Break",
        minuteIndex: 60 - this.state.breakLength
      })
    }
    else if (this.state.secondIndex == 0 && this.state.minuteIndex == 0 && this.state.sessionOrBreak == "Break") {
      let sound = document.getElementById("beep");
      sound.play();
      this.setState ({
        sessionOrBreak: "Session",
        minuteIndex: 60 - this.state.sessionLength
      })
    }
  }
  
  startStop () {
    if (this.state.timer == "Off" && this.state.alreadyStarted == false) {
      this.setState ({
        startOrStop: "Stop",
        timer: "On",
        alreadyStarted: true,
        countdownEnd: setInterval(this.countdown, 1000)
      })
    }
    else if (this.state.timer == "Off" && this.state.alreadyStarted == true) {
      this.setState ({
        startOrStop: "Stop",
        timer: "On",
        countdownEnd: setInterval(this.countdown, 1000)
      })
    }
    else if (this.state.timer == "On") {
      this.setState ({
        startOrStop: "Start",
        timer: "Off"
      })
      clearTimeout(this.state.countdownEnd);
    }
  }
  render() {
    return (
      <div id="clock">
        <div id="break-panel" class="panel">
          <h2 id="break-label">Break Length (minutes)</h2>
          <h3 id="break-length">{this.state.breakLength}</h3>
          <button class="btn btn-default" id="break-decrement" onClick={this.decrement.bind(this, "b")}>-</button>
          <button class="btn btn-default" id="break-increment" onClick={this.increment.bind(this, "b")}>+</button>
        </div>
        <div id="session-panel" class="panel">
          <h2 id="session-label">Session Length (minutes)</h2>
          <h3 id="session-length">{this.state.sessionLength}</h3>
          <button class="btn btn-default" id="session-decrement" onClick={this.decrement.bind(this, "s")}>-</button>
          <button class="btn btn-default" id="session-increment" onClick={this.increment.bind(this, "s")}>+</button>
        </div>
        <br/>
        <div id="countdown-panel" class="panel">
          <h2 id="timer-label">{this.state.sessionOrBreak}</h2>
          <h3 id="time-left">{this.state.minute[this.state.minuteIndex]}:{this.state.second[this.state.secondIndex]}</h3>
          <button class="btn btn-default" id="reset" onClick={this.reset}>Reset</button>
          <button class="btn btn-default" id="start_stop" onClick={this.startStop}>{this.state.startOrStop}</button>
        </div>
        <audio id="beep" src="http://soundbible.com/grab.php?id=1815&type=wav"></audio>
      </div>
    )
  }
}

ReactDOM.render(<Pomodoro/>, document.getElementById("main"));

