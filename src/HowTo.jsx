import { useState } from "react";
import Modal from "./Modal";

const modalTitle = "How to Meditate"
const modalBody = <><p> 
Thinking of absoultely nothing is a very difficult task.  Thankfully that isn't required in order to meditate.  You probably alreaedy meditate multiple times a day
without even realizing it. 
</p>
<p>
These are all suggestions. This is not a definative how to guide, and over time you will find what works for you in your practice.
</p>
<p>
What time of day to meditate?
Right now! Incorporating it into your morning or evening routing is a great way to get into the habbit of meditating every day.  Mornings are a great time to meditate.  If you find yourself in a time crunch at the start of the day, try it in the evening instead.
</p>
<p>
How long to meditate for?
If you're brand new to self-guided meditation, 5 minutes is a good starting point.  If that sounds daunting, go for a minute or two and gradually build from there.
</p>
<p>
What happens if I keep getting distracted by my thoughts? 
That's perfectly find 
</p>
<p>
I find it easiest in a chair in a seated position with my back straight, feet flat on the floor, and hands placed in my lap.  I gently close my eyes.
 I focus my attention on my heart beat and my breath. 
 </p>
<p>
 A mantra helps to keep my mind from wandering too far. Pick one that doesn't give you a strong reaction
 </p>
 <p>
These are all suggestions and as you begin or continue your meditation journey, you'll find what works best for you.  
</p>
<p>
I didn't use AI to write this and you can probably tell.  Sorry I didn't have time to write a short letter.
 </p>
 </>

  const HowTo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const buttonClass="px-4 py-2 m-1 bg-[#1a1a1a] text-white rounded-3xl text-right"
  return (<>
      {isModalOpen && <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} modalTitle={modalTitle} modalBody={modalBody} />}
       <button className={buttonClass} onClick={() => setIsModalOpen(true)} > How to meditate?</button>
  </>)
}
export default HowTo;