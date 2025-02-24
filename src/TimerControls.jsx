import { useState, useEffect } from "react";
import TIMER_STATES from "./TimerStates";
import CustomTime from "./CustomTime";

const TimerControls = ({ duration, setDuration }) => {
  let buttons = [
    { id: "1", label: "1 min", duration: 60 },
    { id: "2", label: "5 min", duration: 300 },
    { id: "3", label: "10 min", duration: 600 },
  ];
  const [selected, setSelected] = useState(buttons[0].id);
  const [isCustomSelected, setIsCustomSelected] = useState(false);

  const handleOnClick = (duration, id) => {
    setDuration(duration);
    setSelected(id);
    setIsCustomSelected(false);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <p>Select how long you'll meditate for</p>
      <div className="flex  flex-wrap items-center justify-center gap-0 sm:gap-4 p-4">
        {buttons.map((button) => (
          <button
            key={button.id}
            className={`px-2 sm:px-4 py-2 m-2 sm:m-1 rounded-lg transition ${
              !isCustomSelected && selected === button.id
                ? "bg-[#6fb551] text-[#242424]"
                : "bg-[#1a1a1a] "
            }`}
            onClick={() => handleOnClick(button.duration, button.id)}
          >
            {button.label}
          </button>
        ))}
        <CustomTime
          duration={duration}
          isCustomSelected={isCustomSelected}
          setIsCustomSelected={setIsCustomSelected}
          setDuration={setDuration}
          // onClick={()=>setSelected(null)}
        ></CustomTime>
      </div>

      {/* <button 
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          onClick={() => setDuration(600)}
        >
          Custom time
        </button> */}
      <br />
    </div>
  );
};

export default TimerControls;
