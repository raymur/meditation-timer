import { useState, useEffect } from "react";
import TIMER_STATES from "./TimerStates";
import { toAnal, toMinuteAndSecondStr } from "./Util";

const Timer = ({ duration, timerState, setTimerState, setParentElapsed }) => {
  const [elapsed, setElapsed] = useState(0);

  var interval;
  useEffect(() => {
    if (timerState == TIMER_STATES.STARTED) {
      interval = setInterval(() => {
        setElapsed((prev) => (prev < duration ? prev + 1 : prev));
      }, 1000);
      return () => clearInterval(interval);
    }
    if (timerState == TIMER_STATES.SET) {
      setElapsed(0);
    }
  }, [duration, timerState]);

  useEffect(() => {
    setParentElapsed(elapsed);
    if (elapsed >= duration) {
      setTimerState(TIMER_STATES.PENDING_FINISHED);
      clearInterval(interval);
    }
  }, [duration, elapsed]);

  const progress = (elapsed / duration) * 100;
  return (
    <>
      <div className="timer flex mx-auto justify-center items-center  ">
        <svg
          viewBox="0 0 100 100"
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            id="total"
            cx="50"
            cy="50"
            r="45"
            stroke="gray"
            strokeWidth="6"
            fill="none"
          />
          <circle
            id="progress"
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
          {timerState != TIMER_STATES.SET &&
            timerState != TIMER_STATES.PENDING_STARTED && (
              <>{toAnal(elapsed)}</>
            )}
          {timerState == TIMER_STATES.PENDING_STARTED && (
            <div className="absolute flex items-center justify-center text-lg w-xs font-normal flex-col">
              <p>Your meditation is about to begin.</p>
              <p>
                Please take a few moments to get comfortable and begin your
                practice.
              </p>
              <p className="text-6xl">😊</p>
            </div>
          )}
        </div>
      </div>
      <div>
        {timerState in [TIMER_STATES.STARTED, TIMER_STATES.PENDING_STARTED] &&
          duration > 0 &&
          "Your meditation will be " + toMinuteAndSecondStr(duration)}
      </div>
    </>
  );
};

export default Timer;
