import TIMER_STATES from "./TimerStates";
import { useState, useEffect } from "react";

const MEDITATIONS = 'mediations';
const TIMER_INCR = 'timer-increment';

const MeditationFinished = ({setTimerState, duration}) =>{
  const [transitioning, setTransitioning] = useState(false);
  const [incr, setIncr] = useState(5);

  useEffect(()=>{
    setTransitioning(true);
    setIncr(getTimerIncrement());
    updateMeditations();
  },[])
  const transClass=" transition-opacity duration-2000 ease-in-out "
  
  const updateMeditations = () => {
    const meditations = localStorage.getItem(MEDITATIONS) || "[]";
    const meditationList = JSON.parse(meditations)
    const date = (new Date()).toISOString().split('T')[0];
    meditationList.push({date, duration})
    localStorage.setItem(MEDITATIONS, JSON.stringify(meditationList))
  }

  const getMeditations = () => {
    const meditations = localStorage.getItem(MEDITATIONS) || [];
    return JSON.parse(meditations);
  }

  const setTimerIncrement = (increment) => {
    increment = Math.max(0,increment);
    localStorage.setItem(TIMER_INCR, increment)
    return increment;
  }

  const handleSetIncr = (incr) => {
    if (incr) {
      incr = setTimerIncrement(incr)
    }
    setIncr(incr);  
  } 

  const getTimerIncrement = () => { return localStorage.getItem(TIMER_INCR)}

  return (<div className={"card"+ transClass + (!transitioning ? ' opacity-0 ' : ' opactiy-100 ') }> 
    <h2>Meditate daily! Start small and build your mindfulness and headspace little by little.</h2>
    <p>Congratulations! You must feel great! </p>
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
