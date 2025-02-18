import TIMER_STATES from "./TimerStates";
import { useState, useEffect, useRef } from "react";
import Storage from "./Storage";
import MeditationLog from "./MeditationLog";
import DayStreak from './DayStreak'

const DEFAULT_INCR = 5;

const MeditationFinished = ({setTimerState, duration}) =>{
  const [transitioning, setTransitioning] = useState(false);
  const [meditations, setMeditations] = useState([]);
  const [incr, setIncr] = useState(DEFAULT_INCR);
  const [logUpdated, setLogUpdated] = useState(false);
  const hasRun = useRef(false);

  useEffect(()=>{
    if (hasRun.current) return; 
    hasRun.current = true; 
    setTransitioning(true);
    let timerIncr = Storage.getTimerIncrement();
    timerIncr = timerIncr == null ? DEFAULT_INCR : timerIncr
    setIncr(timerIncr)
    Storage.setTimerIncrement(timerIncr)
    const m = Storage.updateMeditations(duration);
    setMeditations(m)
    setLogUpdated(true)
      },[])

  const transClass=" transition-opacity duration-2000 ease-in-out "

  const handleSetIncr = (incr) => {
    setIncr(incr);  
    if (incr) {
      incr = Storage.setTimerIncrement(incr)
    }
  } 


  return (<div className={"card"+ transClass + (!transitioning ? ' opacity-0 ' : ' opactiy-100 ') }> 
    <DayStreak meditations={meditations}></DayStreak>
    <p>Congratulations on taking the time to meditate!</p>
    <p>Come back tomorrow and meditate for 
      <input 
        type='number' 
        placeholder='0' 
        className="w-16 p-2 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6fb551] focus:border-[#6fb551]"
        value={incr} 
        onChange={(e)=>handleSetIncr(e.target.value)}

      ></input> 
    seconds longer</p>
    <p>or  <button className='bg-[#1a1a1a]' onClick={() => setTimerState(TIMER_STATES.SET)}>meditate again</button></p>
    <br />
    <MeditationLog logUpdated={logUpdated}></MeditationLog>
  </div>)
}
export default MeditationFinished;
