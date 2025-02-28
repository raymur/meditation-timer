import { useEffect, useState, useRef } from "react";
import "./App.css";
import TimerControls from "./TimerControls";
import TIMER_STATES from "./TimerStates";
import MeditationFinished from "./MeditationFinished";
import Timer from "./Timer";
import ZenMode from "./ZenMode";
import PlaySound from "./PlaySound";
import HowTo from "./HowTo";
import About from "./About";
import NoSleep from "nosleep.js";
import GTag from "./GTag";
import MeditationChart from "./MeditationChart";
var noSleep = new NoSleep();

function App() {
  const [timerState, setTimerState] = useState(TIMER_STATES.SET);
  const [duration, setDuration] = useState(60);
  const [elapsed, setElapsed] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [pendingTimeoutID, setPendingTimeoutID] = useState();

  useEffect(() => {
    setTransitioning(true);
  }, []);

  useEffect(() => {
    if (timerState != TIMER_STATES.STARTED) {
      noSleep.disable();
    }
  }, [timerState]);

  const handleSetTimerState = (newState) => {
    if (newState == TIMER_STATES.PENDING_FINISHED) {
      setTimerState(TIMER_STATES.PENDING_FINISHED);
      const timeoutID = setTimeout(
        () => setTimerState(TIMER_STATES.FINISHED),
        10000,
      );
      setPendingTimeoutID(timeoutID);
    } else if (newState == TIMER_STATES.PENDING_STARTED) {
      setTimerState(TIMER_STATES.PENDING_STARTED);
      const timeoutID = setTimeout(
        () => setTimerState(TIMER_STATES.STARTED),
        10000,
      );
      setPendingTimeoutID(timeoutID);
    } else {
      setTimerState(newState);
    }
  };

  const moveToStarted = () => {
    clearTimeout(pendingTimeoutID);
    setTimerState(TIMER_STATES.STARTED);
  };

  const moveToFinished = () => {
    clearTimeout(pendingTimeoutID);
    setTimerState(TIMER_STATES.FINISHED);
  };

  const handleSetDuration = (newDuration) => {
    newDuration = Math.max(1, newDuration);
    setDuration(newDuration);
  };
  const welcomeText =
    "Meditate daily! Start small and build your mindfulness and headspace little by little.";
  const buttonClass = "px-4 py-2 m-1 bg-[#1a1a1a] text-white rounded-lg";
  const transClass = "   transition-opacity duration-2000 ease-in-out  ";
  return (
    <>
      <GTag />
      {/* <MeditationChart></MeditationChart> */}
      <div
        className={
          transClass +
          (!transitioning ? " opacity-0 " : " opactiy-100 ") +
          " p-0 sm:p-1 w-xs sm:w-lg min-h-full relative" + (timerState === TIMER_STATES.FINISHED ? " m-0 " : " m-auto ")
        }
      >
        <div className=" m-auto grid place-items-center h-20 w-xs px-4  sm:w-sm">
          {timerState === TIMER_STATES.SET && (
            <h2 className="py-3">{welcomeText}</h2>
          )}
        </div>
        {timerState !== TIMER_STATES.FINISHED && (
          <Timer
            duration={duration}
            timerState={timerState}
            setTimerState={handleSetTimerState}
            setParentElapsed={setElapsed}
          />
        )}
        {timerState === TIMER_STATES.SET && (
          <>
            <TimerControls
              duration={duration}
              setDuration={handleSetDuration}
            ></TimerControls>
            <button
              className={
                buttonClass +
                " drop-shadow-lg" +
                "   transition duration-2000 ease-in-out  "
              }
              onClick={() => {
                handleSetTimerState(TIMER_STATES.PENDING_STARTED);
                noSleep.enable();
              }}
            >
              {" "}
              Start meditation
            </button>
          </>
        )}
        {timerState === TIMER_STATES.PENDING_STARTED && (
          <button className={buttonClass} onClick={moveToStarted}>
            {" "}
            Skip delay
          </button>
        )}
        {timerState === TIMER_STATES.STARTED && (
          <button
            className={buttonClass}
            onClick={() => setTimerState(TIMER_STATES.PAUSED)}
          >
            {" "}
            Pause timer
          </button>
        )}
        {timerState === TIMER_STATES.PAUSED && (
          <>
            <button
              className={buttonClass}
              onClick={() => {
                setTimerState(TIMER_STATES.STARTED);
                noSleep.enable();
              }}
            >
              {" "}
              Resume timer
            </button>
            <div className=" mt-4">
              <button
                className={buttonClass + " bg-red-600 hover:border-red-600"}
                onClick={() => setTimerState(TIMER_STATES.SET)}
              >
                Discard meditation
              </button>
              <button
                className={buttonClass + " bg-[#6fb551]"}
                onClick={() => setTimerState(TIMER_STATES.FINISHED)}
              >
                Complete meditation
              </button>{" "}
            </div>{" "}
          </>
        )}
        {timerState === TIMER_STATES.PENDING_FINISHED && (
          <button className={buttonClass} onClick={moveToFinished}>
            {" "}
            Go to meditation results
          </button>
        )}
        {timerState === TIMER_STATES.FINISHED && (
          <MeditationFinished
            setTimerState={setTimerState}
            duration={elapsed}
          ></MeditationFinished>
        )}
        <div className="h-24">{/* hacky solution :( please keep */}</div>
        <footer className="text-right m-1 sm:m-1 flex absolute bottom-0  ">
          <ZenMode></ZenMode>
          <PlaySound timerState={timerState}></PlaySound>
          {timerState != TIMER_STATES.STARTED &&
            timerState != TIMER_STATES.PENDING_FINISHED && (
              <>
                <HowTo></HowTo>
                <About></About>
                {/* <Records ></Records> */}
              </>
            )}
        </footer>
      </div>
    </>
  );
}

export default App;
