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
    }if (timerState == TIMER_STATES.SET) { setElapsed(0)} 
    if (timerState === TIMER_STATES.FINISHED) {}
  }, [duration, timerState]);


  useEffect(() => {
    if (elapsed >= duration) {
        setTimerState(TIMER_STATES.PENDING_FINISHED); 
        clearInterval(interval);
    }
  }, [duration, elapsed, setTimerState]);


  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;
  const progress = (elapsed / duration) * 100;

  let durationDiv;
  if (timerState === TIMER_STATES.STARTED && duration > 0) {
    const durationMinutes = Math.floor(duration / 60)
    const durationSeconds = duration%60
    const innerText = <div>Your meditation will be {durationMinutes} minute{durationMinutes>1 && 's'} {durationSeconds && ' and ' + durationSeconds}</div>
  } 

  return (
    <>
    <div  className="timer flex mx-auto justify-center items-center  ">
      <svg viewBox="0 0 100 100" width='100%' height="100%" xmlns="http://www.w3.org/2000/svg">
        <circle id='total' cx="50" cy="50" r="45" stroke="gray" strokeWidth="6" fill="none" />
        <circle
          id='progress'
          className="transition-all duration-500 ease-in-out transform "
          cx="50"
          cy="50"
          r="45"
          stroke="#6fb551"
          strokeWidth="6"
          fill="none"
          strokeDasharray="283"
          strokeDashoffset={283 - (progress / 100) * 283}
          strokeLinecap="round"
        />
      </svg>
        <div className="absolute flex items-center justify-center text-9xl font-bold">
        { timerState !== TIMER_STATES.SET && <>{minutes}:{seconds.toString().padStart(2, '0')}</>}
      </div>

    </div>
    <div>
    {durationDiv}
    </div> 
    </>
  );
};

export default Timer;