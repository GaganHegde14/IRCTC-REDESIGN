import ReactModal from "react-modal";
import { motion } from "framer-motion";

ReactModal.setAppElement("#root");

const Modal = ({ isOpen, onClose, title, children }) => (
  <ReactModal
    isOpen={isOpen}
    onRequestClose={onClose}
    className="bg-white rounded-lg p-6 max-w-md mx-auto mt-20"
    overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
  >
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {children}
      <button
        onClick={onClose}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Close
      </button>
    </motion.div>
  </ReactModal>
);

export default Modal;
