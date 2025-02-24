import { useCallback } from "react";

const Modal = ({ isOpen, onClose, modalTitle, modalBody }) => {
  if (!isOpen) return null;
  const modal = useCallback((inputElement) => {
    if (inputElement) {
      inputElement.focus();
    }
  }, []);
  const handleOnBlur = (e) => onClose();
  return (
    <div className="absolute inset-0  flex items-center justify-center bg-opacity-50 ">
      <div
        ref={modal}
        autoFocus
        tabIndex="-1"
        className="relative p-6 w-96  bg-[#1a1a1a] rounded-lg shadow-lg"
        onBlur={handleOnBlur}
      >
        <h2 className="text-lg font-semibold mb-4 ">{modalTitle}</h2>
        {modalBody}
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-[#6fb551] text-black rounded hover:bg-[#6fb551]"
        >
          Close
        </button>
      </div>
    </div>
  );
};
export default Modal;
