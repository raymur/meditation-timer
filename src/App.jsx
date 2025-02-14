import { useState } from 'react'
import './App.css'
import TimerControls from './TimerControls'
import TIMER_STATES from './TimerStates'  
import MeditationFinished from './MeditationFinished'
import Timer from './Timer';


function App() {
  const [timerState, setTimerState] = useState(TIMER_STATES.SET)
  const [duration, setDuration] = useState(3); 


  const handleSetTimerState = (newState) => setTimerState(newState) 
  const handleSetDuration = (newDuration) => setDuration(newDuration) 
 
  const buttonClass="px-4 py-2 m-1 bg-[#1a1a1a] text-white rounded-lg"
  return (
    <>
        <div className="card">
      <h2>Meditate daily! Start small and build your mindfulness and headspace little by little.</h2>

        {
           timerState !== TIMER_STATES.FINISHED &&
            <Timer duration={duration} timerState={timerState} setTimerState={setTimerState} />
        }{
          timerState === TIMER_STATES.SET &&
          <><TimerControls 
            timerState={timerState} 
            setTimerState={handleSetTimerState} 
            duration={duration}
            setDuration={handleSetDuration}
          
          ></TimerControls>
          <button className={buttonClass + " drop-shadow-lg"} onClick={()=> setTimerState(TIMER_STATES.STARTED)}> Start meditation</button></>
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
          <MeditationFinished setTimerState={setTimerState}></MeditationFinished>
          }
      </div>
    </>
  )
}




export default App
