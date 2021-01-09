class Timer {
  constructor(durationInput, startButton, pauseButton, callbacks) {
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;
    // connect outside function to timer class.
    if (callbacks) {
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onComplete = callbacks.onComplete;
    }

    //add click event on start/pause button.
    this.startButton.addEventListener("click", this.start);
    this.pauseButton.addEventListener("click", this.pause);
  }
  start = () => {
    //emit that the start button has been clicked.
    if (this.onStart) {
      this.onStart(this.timeRemaining);
    }
    this.tick();
    //set tick to 10 milliseconds.
    this.interval = setInterval(this.tick, 10);
  };

  pause = () => {
    //to stop the tick.
    clearInterval(this.interval);
  };

  tick = () => {
    //emit that the tick has been started.
    if (this.timeRemaining <= 0) {
      this.pause();
      if (this.onComplete) {
        this.onComplete();
      }
    } else {
      //subtract the remaining time by 0.01 seconds/ 10 milliseconds.
      this.timeRemaining = this.timeRemaining - 0.01;
      if (this.onTick) {
        this.onTick(this.timeRemaining);
      }
    }
  };

  //when the value is looked up assign the returned value.
  get timeRemaining() {
    return parseFloat(this.durationInput.value);
  }

  //when the value is assign activation this function.
  set timeRemaining(time) {
    this.durationInput.value = time.toFixed(2);
  }
}
