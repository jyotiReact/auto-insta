import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faTimes } from '@fortawesome/free-solid-svg-icons';

const DeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Deletion",
  description = "Are you sure you want to delete this item? This action cannot be undone.",
  confirmText = "Delete",
  cancelText = "Cancel",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
        {/* Modal Header */}
        <div className="bg-pink-50 p-4 flex items-center">
          <div className="bg-pink-500 text-white p-3 rounded-full mr-3">
            <FontAwesomeIcon icon={faTrashAlt} size="lg" />
          </div>
          <h3 className="text-lg font-semibold text-pink-800">{title}</h3>
          <button
            onClick={onClose}
            className="ml-auto text-pink-500 hover:text-pink-600 transition-colors"
          >
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <p className="text-pink-600 text-sm">{description}</p>
        </div>

        {/* Modal Footer */}
        <div className="bg-pink-50 px-4 py-3 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-pink-300 rounded-md text-pink-700 hover:bg-pink-100 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 transition-colors flex items-center"
          >
            <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;