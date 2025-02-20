import { useEffect, useState } from 'react'
import './App.css'
import TimerControls from './TimerControls'
import TIMER_STATES from './TimerStates'  
import MeditationFinished from './MeditationFinished'
import Timer from './Timer';
import ZenMode from './ZenMode'
import MeditationLog from './MeditationLog'
import PlaySound from './PlaySound'


function App() {
  const [timerState, setTimerState] = useState(TIMER_STATES.SET)
  const [duration, setDuration] = useState(60); 
  const [transitioning, setTransitioning] = useState(false);
  const [pendingFinishedTimeoutID, setPendingFinishedTimeoutID] = useState();
  useEffect(()=>{setTransitioning(true)},[])


  const handleSetTimerState = (newState) => {
    if (newState == TIMER_STATES.PENDING_FINISHED){
      setTimerState(TIMER_STATES.PENDING_FINISHED)
      const timeoutID = setTimeout(()=>setTimerState(TIMER_STATES.FINISHED),10000)
      setPendingFinishedTimeoutID(timeoutID)
    } else {
      setTimerState(newState)
    }
  } 


  const moveToFinished = () => {
    clearTimeout(pendingFinishedTimeoutID)
    setTimerState(TIMER_STATES.FINISHED)
  }

  const handleSetDuration = (newDuration) => {newDuration = Math.max(1,newDuration);setDuration(newDuration)} 
  const welcomeText = "Meditate daily! Start small and build your mindfulness and headspace little by little."
  const buttonClass="px-4 py-2 m-1 bg-[#1a1a1a] text-white rounded-lg"
  const transClass="   transition-opacity duration-2000 ease-in-out  "
  return (
    <>
      <div className={"card"+ transClass + (!transitioning ? ' opacity-0 ' : ' opactiy-100 ') + ' m-0 p-0 sm:p-1 w-xs sm:w-lg min-h-full relative' }>
        <div className=' m-auto grid place-items-center h-20 w-xs px-4  sm:w-sm'>
          {
          timerState === TIMER_STATES.SET && 
          <h2 className='py-3'>{welcomeText}</h2>}
        </div>
        {
          timerState !== TIMER_STATES.FINISHED &&
            <Timer duration={duration} timerState={timerState} setTimerState={handleSetTimerState} />
        }{
          timerState === TIMER_STATES.SET &&
          <>
          <TimerControls 
            duration={duration}
            setDuration={handleSetDuration}
            ></TimerControls>
          <button className={buttonClass + " drop-shadow-lg" + "   transition duration-2000 ease-in-out  "} onClick={()=> setTimerState(TIMER_STATES.STARTED)}> Start meditation</button></>
        }
       {
         timerState === TIMER_STATES.STARTED &&
         <>
         <button className={buttonClass} onClick={()=> setTimerState(TIMER_STATES.PAUSED)}> Pause timer</button>
          <button className={buttonClass} onClick={()=> setTimerState(TIMER_STATES.SET)}> Stop timer</button></>
        }
       {
         timerState === TIMER_STATES.PAUSED &&
         <><button className={buttonClass} onClick={()=> setTimerState(TIMER_STATES.STARTED)}> Resume timer</button>
          <button className={buttonClass} onClick={()=> setTimerState(TIMER_STATES.SET)}> Stop timer</button></>
        }
      {
         timerState === TIMER_STATES.PENDING_FINISHED &&
         <button className={buttonClass} onClick={moveToFinished}> Go to meditation results</button>
      }
      {
         timerState === TIMER_STATES.FINISHED &&
         <MeditationFinished setTimerState={setTimerState} duration={duration}></MeditationFinished>
        }
        <div className='h-12'>{/* hacky solution :( please keep */}</div>
      <footer className='text-right m-1 sm:m-1 flex absolute bottom-0  '><ZenMode></ZenMode>          <PlaySound timerState={timerState}></PlaySound>
      </footer>
      </div>
    </>
  )
}




export default App
