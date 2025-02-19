import { useState, useEffect } from "react";
import Storage from "./Storage";
import { toAnal, toMinSecStr  } from "./Util";

const DEFAULT_CUSTOM = 7*60 + 30;
const SM_BP = 640;

const CustomTime = ({duration, setDuration, onClick, isCustomSelected, setIsCustomSelected
}) =>{
  const [isEditing, setIsEditing] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [d, setD] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < SM_BP);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < SM_BP);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    className={`px-2 sm:px-4 py-2 m-2 sm:m-1 rounded-lg ${isCustomSelected
      ? "bg-[#6fb551] text-[#242424]"
      : "bg-[#1a1a1a]"}`}
    onClick={()=>{
      setIsEditing(true);
      setIsCustomSelected(true)}
    }>Custom: {isSmallScreen? toAnal(d) : toMinSecStr(d)} </button>
  
  }</>
    )
}
export default CustomTime;
