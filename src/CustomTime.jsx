import { useState, useEffect } from "react";
import Storage from "./Storage";

const DEFAULT_CUSTOM = 7*60 + 30;

const CustomTime = ({duration, setDuration, onClick, isCustomSelected, setIsCustomSelected
}) =>{
  const [isEditing, setIsEditing] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [d, setD] = useState(0);

  useEffect(()=>{
    const prevDur = Storage.getLastMeditationDuration()
    const incr = Storage.getTimerIncrement() || 0
    if (!prevDur) {
      setD(DEFAULT_CUSTOM);
    } else {
      setD(Number(prevDur) + Number(incr))
    } 
  },[])


  const handleChange = (e) => {
    const val = e.target.value
    if (val ){

      setDuration(val)
    }
    setD(val)
};

  const handleBlurOrEnter = (e) => {
    if (e.type === "blur" || e.key === "Enter") {
        setIsEditing(false);
    }
};


  const minutes = Math.floor(d / 60);
  const seconds = d % 60;


  return (<>
  {
    isEditing ? 
    <input                    
    type="number"
    className="w-32 p-2 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6fb551] focus:border-[#6fb551]"
    value={d}
    onChange={handleChange}
    onBlur={handleBlurOrEnter}
    onKeyDown={handleBlurOrEnter}
    autoFocus ></input> :
<button 
    className={ isCustomSelected
      ? "bg-[#6fb551] text-[#242424]"
      : "bg-[#1a1a1a]"}
    onClick={()=>{
      setIsEditing(true);
      setIsCustomSelected(true)}
    }>Custom:
    {minutes>0 && ` ${minutes} min`}
    {seconds>0 && ` ${seconds} sec`}</button>
  
  }</>
    )
}
export default CustomTime;
