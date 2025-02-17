import TIMER_STATES from "./TimerStates";
import { useState, useEffect } from "react";
import Storage from "./Storage";



const MeditationFinished = ({setTimerState, duration}) =>{
  const [transitioning, setTransitioning] = useState(false);
  const [incr, setIncr] = useState(5);

  useEffect(()=>{
    setTransitioning(true);
    setIncr(Storage.getTimerIncrement());
    Storage.updateMeditations(duration);
  },[])
  const transClass=" transition-opacity duration-2000 ease-in-out "

  const handleSetIncr = (incr) => {
    if (incr) {
      incr = Storage.setTimerIncrement(incr)
    }
    setIncr(incr);  
  } 


  return (<div className={"card"+ transClass + (!transitioning ? ' opacity-0 ' : ' opactiy-100 ') }> 
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
  </div>)
}
export default MeditationFinished;
