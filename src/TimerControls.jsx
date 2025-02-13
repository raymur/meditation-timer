import { useState, useEffect } from 'react';
import TIMER_STATES from './TimerStates'


const TimerControls = ({timerState, setTimerState, duration, setDuration}) => {

  return (
    <div class="flex flex-col items-center space-y-4">
      <p>Select a value for the timer</p>
      <div class="flex space-x-2">
      {import.meta.env.MODE === 'development'&& <button 
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          onClick={() => setDuration(5)}
        >
          5 sec
      </button>}
      <button 
          class="px-4 py-2 bg-blue-500 text-white rounded-lg"
          onClick={() => setDuration(60)}
        >
          1 min
        </button>
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          onClick={() => setDuration(300)}
        >
          5 min
        </button>
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          onClick={() => setDuration(600)}
        >
          10 min
        </button>
        {/* <button 
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          onClick={() => setDuration(600)}
        >
          Custom time
        </button> */}
      </div>
      <br />
    </div>
  );
};


export default TimerControls;