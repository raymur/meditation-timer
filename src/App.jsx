import { useEffect, useState } from 'react'
import './App.css'
import TimerControls from './TimerControls'
import TIMER_STATES from './TimerStates'  
import MeditationFinished from './MeditationFinished'
import Timer from './Timer';
import ZenMode from './ZenMode'


function App() {
  const [timerState, setTimerState] = useState(TIMER_STATES.SET)
  const [duration, setDuration] = useState(60); 
  const [transitioning, setTransitioning] = useState(false);
  useEffect(()=>{setTransitioning(true)},[])


  const handleSetTimerState = (newState) => {
    if (newState == TIMER_STATES.PENDING_FINISHED){
      setTimerState(TIMER_STATES.PENDING_FINISHED)
      setTimeout(()=>setTimerState(TIMER_STATES.FINISHED),3000)
    } else {
      setTimerState(newState)
    }
  } 
  const handleSetDuration = (newDuration) => {newDuration = Math.max(1,newDuration);setDuration(newDuration)} 
 
  const buttonClass="px-4 py-2 m-1 bg-[#1a1a1a] text-white rounded-lg"
  const transClass="   transition-opacity duration-2000 ease-in-out  "
  return (
    <>
      <div className={"card"+ transClass + (!transitioning ? ' opacity-0 ' : ' opactiy-100 ') }>
        {timerState === TIMER_STATES.SET && <h2>Meditate daily! Start small and build your mindfulness and headspace little by little.</h2>}
        {
          timerState !== TIMER_STATES.FINISHED &&
            <Timer duration={duration} timerState={timerState} setTimerState={handleSetTimerState} />
        }{
          timerState === TIMER_STATES.SET &&
          <>
          <TimerControls 
            timerState={timerState} 
            setTimerState={handleSetTimerState} 
            duration={duration}
            setDuration={handleSetDuration}
            
            ></TimerControls>
          <button className={buttonClass + " drop-shadow-lg" + "   transition duration-2000 ease-in-out  "} onClick={()=> setTimerState(TIMER_STATES.STARTED)}> Start meditation</button></>
        }
       {
         timerState === TIMER_STATES.STARTED &&
         <><button className={buttonClass} onClick={()=> setTimerState(TIMER_STATES.PAUSED)}> Pause timer</button>
          <button className={buttonClass} onClick={()=> setTimerState(TIMER_STATES.SET)}> Stop timer</button></>
        }
       {
         timerState === TIMER_STATES.PAUSED &&
         <><button className={buttonClass} onClick={()=> setTimerState(TIMER_STATES.STARTED)}> Resume timer</button>
          <button className={buttonClass} onClick={()=> setTimerState(TIMER_STATES.SET)}> Stop timer</button></>
        }
       {
         timerState === TIMER_STATES.FINISHED &&
         <MeditationFinished setTimerState={setTimerState} duration={duration}></MeditationFinished>
        }
      </div>
      <footer className='text-right'><ZenMode></ZenMode></footer>
    </>
  )
}




export default App
