import { useEffect, useState } from "react";
import Storage from "./Storage";
import { toAnal, toMinSecStr } from "./Util";
import trashIcon from "./assets/trash.svg";

const MeditationChart = ({ logUpdated, setLogUpdated }) => {
  const [meditations, setMeditations] = useState([]);

  useEffect(() => {
    const newMeditations = Storage.getMeditations().sort(
      (a, b) => a.date + a.time < b.date + b.time,
    );
    setMeditations(newMeditations);
  }, [logUpdated]);

  const deleteMeditation = (med) => {
    const updatedMeditations = meditations.filter((x) => x != med);
    Storage.updatedMeditations(updatedMeditations);
    setMeditations(updatedMeditations);
    setLogUpdated();
  };

  return (
    <div className=" w-full mx-0 min-w-[300px]">
      <h2 className="text-xl mb-4">Meditation Records</h2>
      <div className="grid grid-cols-[1.5fr_1fr_1fr_0.8fr] font-bold p-2 gap-2 min-w-full">
        <div className="whitespace-nowrap">Date</div>
        <div>Time</div>
        <div>Duration</div>
        <div>Actions</div>
      </div>
      {meditations.length > 0 ? (
        meditations.map((meditation) => (
          <div
            key={Math.random()}
            className="grid grid-cols-[1.5fr_1fr_1fr_0.8fr] border-t p-2 items-center gap-2 min-w-full"
          >
            <div className="whitespace-nowrap overflow-hidden text-ellipsis">{meditation.date}</div>
            <div className="whitespace-nowrap overflow-hidden text-ellipsis">{meditation.time}</div>
            <div className="whitespace-nowrap overflow-hidden text-ellipsis">{toMinSecStr(meditation.duration)}</div>
            <div>
              <button
                className="bg-red-600 p-1 hover:border-white text-white"
                onClick={() => deleteMeditation(meditation)}
                title="Delete"
              >
                <img src={trashIcon} alt="Delete" />
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500 py-4">
          No meditation records found.
        </div>
      )}
    </div>
  );
};

export default MeditationChart;
