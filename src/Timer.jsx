import { useState, useEffect } from "react";
import TIMER_STATES from "./TimerStates";

const Timer = ({ duration, timerState, setTimerState}) => {
  const [elapsed, setElapsed] = useState(0);


  var interval;
  useEffect(() => {
    if (timerState == TIMER_STATES.STARTED) {

      interval = setInterval(() => {
      setElapsed(prev => (prev < duration ?  prev + 1:prev));
  }, 1000);
      return () => clearInterval(interval);
    }if (timerState == TIMER_STATES.SET) {
      setElapsed(0)
    } if (timerState === TIMER_STATES.FINISHED) {
  
    }

  }, [duration, timerState]);


  useEffect(() => {
    if (elapsed >= duration) {
      setTimerState(TIMER_STATES.FINISHED); 
      clearInterval(interval);
    }
  }, [duration, elapsed, setTimerState]);


  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;
  const progress = (elapsed / duration) * 100;

  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <svg className="absolute w-full h-full" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" stroke="#e0e0e0" strokeWidth="10" fill="none" />
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="green"
          strokeWidth="10"
          fill="none"
          strokeDasharray="283"
          strokeDashoffset={283 - (progress / 100) * 283}
          strokeLinecap="round"
        />
      </svg>

        <div className="absolute flex items-center justify-center text-xl font-bold z-10">
        { timerState !== TIMER_STATES.SET && <>{minutes}:{seconds.toString().padStart(2, '0')}</>}
      </div>

    </div>
  );
};

export default Timer;