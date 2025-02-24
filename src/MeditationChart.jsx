import { useEffect, useState } from "react";
import Storage from "./Storage";
import { toAnal, toMinSecStr } from "./Util";

const MeditationChart = ({ logUpdated, setLogUpdated }) => {
  const [meditations, setMeditations] = useState([]);

  useEffect(() => {
    const meditations = Storage.getMeditations().sort(
      (a, b) => a.date + a.time < b.date + b.time,
    );
    setMeditations(meditations);
  }, [logUpdated]);

  const deleteMeditation = (med) => {
    const updatedMeditations = meditations.filter((x) => x != med);
    Storage.updatedMeditations(updatedMeditations);
    setMeditations(updatedMeditations);
    setLogUpdated();
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-xl mb-4">Meditation Records</h2>
      <div className="grid grid-cols-4 font-bold p-2">
        <div>Date</div>
        <div>Time</div>
        <div>Duration</div>
        <div>Actions</div>
      </div>
      {meditations.length > 0 ? (
        meditations.map((meditation) => (
          <div
            key={Math.random()}
            className="grid grid-cols-4 border-t p-2 items-center"
          >
            <div>{meditation.date}</div>
            <div>{meditation.time}</div>
            <div>{toMinSecStr(meditation.duration)}</div>
            <div>
              <button
                className="bg-red-600 p-1 hover:border-white"
                onClick={() => deleteMeditation(meditation)}
              >
                Delete
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
