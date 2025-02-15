import { useState } from "react";
const ZenMode = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const buttonClass="px-4 py-2 m-1 bg-[#1a1a1a] text-white rounded-3xl text-right"
  const handleFullScreen = () =>{
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true));; 
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false));
    }
  }
  const zButton = <button className={buttonClass} onClick={()=>handleFullScreen()}>Z</button>
  return(<>
    <Tooltip text={(!isFullscreen? "Enter" : "Exit") + " zen mode"} children={zButton} className=''/>
    
  </>)
}

const Tooltip = ({ text, children }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div 
      className="relative flex "
    >
      <div
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="cursor-pointer"
      >
        {children}
      </div>
      <div
        className={`absolute -top-7  bg-[#1a1a1a]  whitespace-nowrap rounded-md text-white text-sm px-3 py-1 transition-opacity duration-300 ${
          visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        {text}
      </div>
    </div>
  );
};


export default ZenMode;