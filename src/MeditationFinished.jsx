import TIMER_STATES from "./TimerStates";
import { useState, useEffect } from "react";

const MeditationFinished = ({setTimerState}) =>{
  const [transitioning, setTransitioning] = useState(false);
  useEffect(()=>{setTransitioning(true)},[])
  const transClass="   transition-opacity duration-2000 ease-in-out  "
  


  return (<div className={"card"+ transClass + (!transitioning ? ' opacity-0 ' : ' opactiy-100 ') }> 
    <h2>Meditate daily! Start small and build your mindfulness and headspace little by little.</h2>
    <p>Congratulations! You must feel great! </p>
    <p>Come back tomorrow and meditate for 5 seconds longer</p>
    <p>or  <button className='bg-[#1a1a1a]' onClick={() => setTimerState(TIMER_STATES.SET)}>meditate again</button></p>
  </div>)
}
export default MeditationFinished;
