import { useEffect, useState } from 'react'
import './App.css'
import Storage from "./Storage";
import { toAnal, toMinSecStr  } from "./Util";

const DEFAULT_CUSTOM = 7*60 + 30;
const SM_BP = 640;

function TimePicker({setDuration, isCustomSelected, setIsCustomSelected}) {
  const [isEditing, setIsEditing] = useState(false)
  const [min, setMin] = useState(1)
  const [sec, setSec] = useState('00')
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < SM_BP);

  const calcDuration = (m,s) => (m ? parseInt(m, 10) * 60 : 0) + (s ? parseInt(s, 10) : 0 )

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < SM_BP);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  useEffect(()=>{
    let newDuration = calcDuration(min, sec)
    setDuration(newDuration)
  },[min,sec])
  
  const handleMinuteChange = (e) => {
    const input = e.target.value.replace(/\D/g, "");
    let newMinutes = input!='' ? parseInt(input, 10) : ''
    setMin(newMinutes)
  }

  const handleSecondChange = (e) => {
    const input = e.target.value.replace(/\D/g, "");
    if (input!='') {
      let newSeconds = parseInt(input, 10)
      if (newSeconds >= 60) {
        newSeconds = 59
      }
      setSec(newSeconds)
    }else {
      setSec('')
    }
  }

  const handleOnBlur = (e) =>{
    if (e.key === 'Enter' || (e.type === "blur" && !e.currentTarget.contains(e.relatedTarget) )){
      console.log(e.relatedTarget)
      if (sec === '') {
        setSec('00')
      }if (sec < 10 && sec.length == 1) {
        setSec('0'+sec)
      }
      if (min=== ''){
        setMin('0')
      }
      setIsEditing(false)
    }
  }

  return (
<>
      {isEditing ? 
      <div 
        className="w-45 p-2 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6fb551] focus:border-[#6fb551]"
        style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} onBlur={handleOnBlur} onKeyDown={handleOnBlur}>
      <input 
          className="noFocus"

      autoFocus type='number' value={min} maxLength='2' onChange={handleMinuteChange} style={{border: 'none', background: 'none', outline: 'none', textAlign: 'start', width: '100%', height: '100%', direction: 'rtl'}} placeholder='0'></input>
      <div  tabindex="-1" style={{position: 'relative', color: 'white', bottom: '0.15em', display: 'inline', padding: '0.25em', cursor: 'text', border: 'none',  background: 'transparent'}}>:</div>
      <input  
                className="noFocus"
                 type='number' value={sec} maxLength='2' onChange={handleSecondChange} style={{border: 'none', background: 'none', outline: 'none', textAlign: 'end', width: '100%', height: '100%',direction: 'rtl'}} placeholder='00'></input>
      </div>

      :
        <button     className={`px-1 sm:px-2 w-45 py-2 m-2 sm:m-1 rounded-lg ${isCustomSelected
          ? "bg-[#6fb551] text-[#242424]"
          : "bg-[#1a1a1a]"}`} style={{borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center'}} onClick={()=>{setIsEditing(true);  setIsCustomSelected(true);}}>Custom: {isSmallScreen? toAnal(calcDuration(min, sec)) : toMinSecStr(calcDuration(min, sec))} </button>
    }

</>
    )
}

export default TimePicker
