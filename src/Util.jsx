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

export {toMinSec, toMinSecStr, toSec, toAnal};