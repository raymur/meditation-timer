import { getDateAndTime } from "./Util";

const MEDITATIONS = "mediations";
const TIMER_INCR = "timer-increment";
const MUTED = "muted";

class Storage {
  static addNewMeditation = (duration, note = "") => {
    const meditations = localStorage.getItem(MEDITATIONS) || "[]";
    const meditationList = JSON.parse(meditations);
    let [date, time] = getDateAndTime();
    meditationList.push({ date, time, duration, note });
    localStorage.setItem(MEDITATIONS, JSON.stringify(meditationList));
    return meditationList;
  };

  static getMeditations = () => {
    const meditations = localStorage.getItem(MEDITATIONS) || "[]";
    return JSON.parse(meditations);
  };

  static getLastMeditationDuration = () => {
    const mediations = this.getMeditations();
    if (!mediations) {
      return null;
    }
    const mostRecent = mediations.reduce(
      (max, e) => (max.date+max.time < e.date+e.time ? e : max),
      { date: "" },
    );
    return mostRecent.duration;
  };

  static updatedMeditations = (meditations) => {
    const meditationString = JSON.stringify(meditations);
    localStorage.setItem(MEDITATIONS, meditationString);
  };

  static setTimerIncrement = (increment) => {
    increment = Math.max(0, increment);
    localStorage.setItem(TIMER_INCR, increment);
    return increment;
  };

  static getTimerIncrement = () => {
    return localStorage.getItem(TIMER_INCR);
  };

  static setMuted = (isMuted) => {
    localStorage.setItem(MUTED, isMuted.toString());
  };

  static getMuted = () => {
    return localStorage.getItem(MUTED) == "true" ? true : false;
  };
}
export default Storage;
