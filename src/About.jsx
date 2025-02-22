import { useState } from "react";
import Modal from "./Modal";


const modalTitle = "The story behind Super Fuel"
const modalBody = <p> 
Hey, my name is Ray.  I designed and built this app with lots of love.  My goal is to build free tools and apps that improve other's lives.  I hope it makes a positive impact on yours!
Let me know if you have any suggestions on how to improve this app.  I will add a contact option soon.
 </p>

  const About = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const buttonClass="px-4 py-2 m-1 bg-[#1a1a1a] text-white rounded-3xl text-right"
  return (<>
      {isModalOpen && <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} modalTitle={modalTitle} modalBody={modalBody} />}
       <button className={buttonClass} onClick={() => setIsModalOpen(true)} >About</button>
  </>)
}
export default About;