import { useEffect, useState } from "react";
import TIMER_STATES from "./TimerStates";
import Storage from "./Storage";

const PlaySound = ({timerState}) => {
  const [buffer, setBuffer] = useState(null)
  const [soundOn, setSoundOn] = useState(!Storage.getMuted())
  const [sources, setSources] = useState([])
  const [context, setContext] = useState( new AudioContext())

  useEffect(()=>{ loadDogSound()},[])
  useEffect(()=>{
    if (timerState==TIMER_STATES.PENDING_STARTED || timerState == TIMER_STATES.PENDING_FINISHED){
        playNTimes(3)
    }
  }, [timerState])



  const buttonClass="px-4 py-2 m-1 bg-[#1a1a1a] text-white rounded-3xl text-right"



  function loadDogSound(url='bell.wav') {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    request.onload = function() {
      context.decodeAudioData(request.response, function(b) {
        setBuffer(b);
    }, ()=>{});
    }
    request.send();
}

const toggleSound = () =>{
  const mute = soundOn;
  setSoundOn(!soundOn)
  handleMute(mute);
  Storage.setMuted(mute)
}

const handleMute = (mute) => {
  if(mute){
    sources.forEach(s=>s.disconnect());      
  }else{
    sources.forEach(s=>s.connect(context.destination));      
  }
}


function playSound() {
    var source = context.createBufferSource(); // creates a sound source
    sources.push(source)
    source.buffer = buffer;
    if (soundOn) {source.connect(context.destination);}       // connect the source to the context's destination (the speakers)
    source.start();

  }

  const  playNTimes =  async (n) => {
    let i = 0
    playSound(); 
    var intervalID = setInterval(() => { 
      if (i>=n-1){ 
        clearInterval(intervalID
      )}else{
        playSound(); 
      }
      i++
    }, 2000)
  }

  return(<div       className="relative flex ">
  <button className={buttonClass} onClick={toggleSound}>toggle sound {soundOn ? '🔊' : '🔇'}</button>
  </div>)
}
export default PlaySound;