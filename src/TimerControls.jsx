import { useState, useEffect } from 'react';
import TIMER_STATES from './TimerStates'


const TimerControls = ({timerState, setTimerState, duration, setDuration}) => {
  const [selected, setSelected] = useState(null);

  const handleOnClick = (duration, id) => {setDuration(duration); setSelected(id)}
  let buttons = [
    { id: "1", label: "1 min", duration: 60},
    { id: "2", label: "5 min", duration: 300},
    { id: "3", label: "10 min", duration: 600},
  ]

  if (import.meta.env.MODE === 'development') {
    buttons.push({ id: "4", label: "3 sec", duration: 3},)
  }

  return (
    <div class="flex flex-col items-center space-y-4">
      <p>Select how long you'll meditate for</p>
      <div class="flex space-x-2">
      <div className="flex gap-4 p-4">
      {buttons.map((button) => (
        <button
          key={button.id}
          class={`px-4 py-2 m-2 rounded-lg transition ${
            selected === button.id
              ? "bg-[#6fb551] text-[#242424]"
              : "bg-[#1a1a1a] "
          }`}
          onClick={() => handleOnClick(button.duration, button.id)}
        >
          {button.label}
        </button>
      ))}
    </div>

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