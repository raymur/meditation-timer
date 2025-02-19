const MEDITATIONS = 'mediations';
const TIMER_INCR = 'timer-increment';

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
    console.log(mediations)
    if (!mediations) {return null;}
    const mostRecent = mediations.reduce((max, e) => max.date < e.date ? e : max, {date: ''})
    console.log(mostRecent)
    return mostRecent.duration
  }

  static setTimerIncrement = (increment) => {
    increment = Math.max(0,increment);
    localStorage.setItem(TIMER_INCR, increment)
    return increment;
  }

  static getTimerIncrement = () => { return localStorage.getItem(TIMER_INCR)}

}
export default Storage;