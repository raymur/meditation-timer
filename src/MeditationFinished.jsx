import TIMER_STATES from "./TimerStates";
import { useState, useEffect, useRef } from "react";
import Storage from "./Storage";
import MeditationLog from "./MeditationLog";
import DayStreak from "./DayStreak";
import { toMinuteAndSecondStr } from "./Util";
import MeditationChart from "./MeditationChart";
import { trackMeditation } from "./GTag";

const DEFAULT_INCR = 5;

const MeditationFinished = ({ setTimerState, duration }) => {
  const [transitioning, setTransitioning] = useState(false);
  const [meditations, setMeditations] = useState([]);
  const [incr, setIncr] = useState(DEFAULT_INCR);
  const [logUpdated, setLogUpdated] = useState(false);
  const [note, setNote] = useState("");
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    setTransitioning(true);
    let timerIncr = Storage.getTimerIncrement();
    timerIncr = timerIncr == null ? DEFAULT_INCR : timerIncr;
    setIncr(timerIncr);
    Storage.setTimerIncrement(timerIncr);
    const m = Storage.addNewMeditation(duration, note);
    setMeditations(m);
    setLogUpdated(!logUpdated);
    trackMeditation(duration);
  }, []);

  const transClass = " transition-opacity duration-2000 ease-in-out ";

  const handleSetIncr = (incr) => {
    setIncr(incr);
    if (incr) {
      incr = Storage.setTimerIncrement(incr);
    }
  };

  const handleNoteChange = (e) => {
    const newNote = e.target.value;
    setNote(newNote);
    const updatedMeditations = [...meditations];
    if (updatedMeditations.length > 0) {
      updatedMeditations[updatedMeditations.length - 1].note = newNote;
      Storage.updatedMeditations(updatedMeditations);
      setMeditations(updatedMeditations);
      setLogUpdated(!logUpdated);
    }
  };

  return (
    <div
      className={
        "w-[98%] min-w-[375px] mx-auto sm:w-[95%] md:w-[90%] lg:w-[85%] my-4" + transClass + (!transitioning ? " opacity-0 " : " opactiy-100 ")
      }
    >
      <DayStreak meditations={meditations} className='my-4'></DayStreak>
      <p className='my-8'>
        Congratulations on taking the time to meditate for{" "}
        {toMinuteAndSecondStr(duration)}!
      </p>
      {/* <div className="mb-4">
        <textarea
          placeholder="Save a note about your meditation if you'd like"
          className="w-full p-2 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6fb551] focus:border-[#6fb551] bg-[#1a1a1a] min-h-[100px]"
          value={note}
          onChange={handleNoteChange}
        ></textarea>
      </div> */}
      <p>
        Meditate tomorrow for
        <input
          type="number"
          placeholder="0"
          className="w-16 p-2 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6fb551] focus:border-[#6fb551] "
          value={incr}
          onChange={(e) => handleSetIncr(e.target.value)}
        ></input>
        seconds longer
      </p>
      <p className="my-6">
        or{" "}
        <button
          className="bg-[#1a1a1a]"
          onClick={() => setTimerState(TIMER_STATES.SET)}
        >
          meditate again
        </button>
      </p>
      <br />
      <div className="w-full overflow-x-auto">
        <div className='m-0 p-0 my-6'>
        <MeditationLog logUpdated={logUpdated}></MeditationLog>

        </div>
        <div className='m-0 p-0 my-6'>
        <MeditationChart
          logUpdated={logUpdated}
          setLogUpdated={setLogUpdated}
        ></MeditationChart>

        </div>
      </div>
    </div>
  );
};
export default MeditationFinished;
