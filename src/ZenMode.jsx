import { useState, useContext } from "react";

const getText = () =>  (!document.fullscreenElement? "Enter" : "Exit") + " zen mode"
const ZenMode = () => {
  const buttonClass="px-4 py-2 m-1 bg-[#1a1a1a] text-white rounded-3xl text-right"
  const handleFullScreen = () =>{
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  const zButton = <button className={buttonClass} onClick={()=>handleFullScreen()}>Z</button>
  return(<>
    <Tooltip  children={zButton} className=''/>
    
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
        {getText()}
      </div>
    </div>
  );
};


export default ZenMode;