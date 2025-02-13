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
          <button onClick={()=> setTimerState(TIMER_STATES.STARTED)}> Start timer</button></>
        }
       {
          timerState === TIMER_STATES.STARTED &&
          <><button onClick={()=> setTimerState(TIMER_STATES.PAUSED)}> Pause timer</button>
          <button onClick={()=> setTimerState(TIMER_STATES.SET)}> Stop timer</button></>
        }
       {
          timerState === TIMER_STATES.PAUSED &&
          <><button onClick={()=> setTimerState(TIMER_STATES.STARTED)}> Resume timer</button>
          <button onClick={()=> setTimerState(TIMER_STATES.SET)}> Stop timer</button></>
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
