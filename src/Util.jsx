
// TIME UTILS
const toMinSec = (sec) => [Math.floor(sec/60), sec%60]
const toMinSecStr = (sec) => {
  const [m,s] = toMinSec(sec);
  if (!m) return `${s} sec`
  if (!s) return `${m} min`
  return `${m} min ${s} sec`
}
const toAnal = (sec) => {
  const [m,s] = toMinSec(sec);
  return `${m}:${('0'+s).slice(-2)}`
}
const toSec = (min, sec) => min * 60 + sec 


//DATE UTILS
const getDayStreak = (dates) => {
  if (dates.length <= 1){
    return dates.length
  }
  dates = [... new Set(dates.sort())].reverse()
  if (!isToday(dates[0])){
    return 0;
  }
  let count = 1;
  let last = dates[0]
  for (let i = 1; i < dates.length; i++) {
    if (getPreviousDay(last) == dates[i]){
      count ++;
    }else {
      break;
    }
  }
  return count
  
}
const getPreviousDay = (dateString) => {
  const date = new Date(dateString);
  date.setDate(date.getDate() - 1);
  return date.toISOString().split("T")[0];
}
const isToday = (dateString) => {
  const today = (new Date()).toISOString().split("T")[0];
  return today == dateString
}


export {toMinSec, toMinSecStr, toSec, toAnal, getDayStreak, getPreviousDay};