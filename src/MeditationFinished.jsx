import TIMER_STATES from "./TimerStates";

const MeditationFinished = ({setTimerState}) =>{
  return (<> 
    <p>Congratulations! You must feel great! </p>
    <p>Come back tomorrow and meditate for 5 seconds longer</p>
    <p>or  <button class='bg-[#1a1a1a]' onClick={() => setTimerState(TIMER_STATES.SET)}>meditate again</button></p>
  </>)
}
export default MeditationFinished;
