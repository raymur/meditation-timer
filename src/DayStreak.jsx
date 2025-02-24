import { useEffect, useState } from "react";
import { getDayStreak } from "./Util";
const DayStreak = ({meditations})=>{
  const [streak, setStreak] =  useState(1)
  useEffect(()=>{
    const dates = meditations.map(e=>e.date)
    const dayStreak = getDayStreak(dates)
    setStreak(dayStreak)
  },[meditations])

  return(<>
  <div className='bg-[#1a1a1a] border-[#6fb551] py-8 text-6xl rounded-xl border-solid border-5 font-bold m-2 p-2 ' style={{fontFamily: "Arial Rounded MT Bold"}}> 
    <div className="rounded-full bg-[#1a1a1a] inline-block py-8 px-11 min-w-[120px] min-h-[120px] mr-2 border-[#6fb551] border-solid border-10">{streak}</div>
    <div className="inline-block" >day streak!</div>
  </div>
  </>)
}
export default DayStreak;