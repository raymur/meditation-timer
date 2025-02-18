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
    <p>YOU HAVE A {streak} DAY STREAK!!</p>
  </>)
}
export default DayStreak;