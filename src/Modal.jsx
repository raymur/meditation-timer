import { useCallback } from "react";
import closeIcon from "./assets/close.svg";

const Modal = ({ isOpen, onClose, modalTitle, modalBody }) => {
  // if (!isOpen) return null;
  const modal = useCallback((inputElement) => {
    if (inputElement) {
      inputElement.focus();
    }
  }, []);
  const handleOnBlur = (e) => {} //onClose();
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
      <div
        ref={modal}
        autoFocus
        tabIndex="-1"
        className="relative bg-[#1a1a1a] rounded-lg shadow-lg text-left w-[600px] max-w-[90vw] max-h-[90vh] flex flex-col"
        onBlur={handleOnBlur}
      >
        <div className="sticky top-0 bg-[#1a1a1a] p-6 pb-4 rounded-t-lg border-b border-black z-10">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">{modalTitle}</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-[#6fb551] text-black hover:bg-[#6fb551] flex items-center justify-center"
            >
              <img src={closeIcon} alt="Close" />
            </button>
          </div>
        </div>
        
        <div className="p-6 pt-4 overflow-y-auto">
          <div className="modal-content [&>p]:mb-4">
            {modalBody}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
