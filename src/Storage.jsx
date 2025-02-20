const MEDITATIONS = 'mediations';
const TIMER_INCR = 'timer-increment';
const MUTED = 'muted'

class Storage {
static updateMeditations = (duration) => {
    const meditations = localStorage.getItem(MEDITATIONS) || "[]";
    const meditationList = JSON.parse(meditations)
    const date = (new Date()).toISOString().split('T')[0];
    meditationList.push({date, duration})
    localStorage.setItem(MEDITATIONS, JSON.stringify(meditationList))
    return meditationList;
  }

  static getMeditations = () => {
    const meditations = localStorage.getItem(MEDITATIONS) || '[]';
    return JSON.parse(meditations);
  }

  static getLastMeditationDuration = () => {
    const mediations = this.getMeditations()
    if (!mediations) {return null;}
    const mostRecent = mediations.reduce((max, e) => max.date < e.date ? e : max, {date: ''})
    return mostRecent.duration
  }

  static setTimerIncrement = (increment) => {
    increment = Math.max(0,increment);
    localStorage.setItem(TIMER_INCR, increment)
    return increment;
  }

  static getTimerIncrement = () => { return localStorage.getItem(TIMER_INCR)}


  static setMuted = (isMuted) => {
    localStorage.setItem(MUTED, isMuted.toString())
  }

  static getMuted = () => { return localStorage.getItem(MUTED) == 'true' ? true : false}
}
export default Storage;