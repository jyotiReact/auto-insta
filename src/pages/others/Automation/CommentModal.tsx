import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';

const CommentRepliesModal: React.FC<{ onClose: () => void }> = ({
  onClose,
  replies,
  setReplies,
}) => {
  const [selectedReply, setSelectedReply] = useState<string | null>(null);
  const [newReply, setNewReply] = useState('');

  const handleAddReply = () => {
    if (
      newReply.trim() &&
      !replies.some((r) => r.text === newReply.trim())
    ) {
        setReplies([
        ...replies,
        {
          id: String(replies.length + 1),
          text: newReply.trim(),
          emoji: '😄',
        },
      ]);
      setNewReply('');
    }
  };

  const handleRemoveReply = (id: string) => {
    setReplies(replies.filter((reply) => reply.id !== id));
    if (selectedReply === replies.find((r) => r.id === id)?.text) {
      setSelectedReply(null);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-9999 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-xl w-[500px] shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-indigo-600 transition-colors duration-200"
        >
          <FontAwesomeIcon icon={faTimes} className="h-5 w-5" />
        </button>

        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Setup Comment Replies
        </h2>

        <div className="space-y-4 mb-6">
          <p className="text-sm text-gray-600">Add Random Comment Replies</p>
          {replies.map((reply) => (
            <div
              key={reply.id}
              className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <label className="flex items-center space-x-3 flex-1">
                <span className="text-gray-800">{reply.text}</span>
                <span className="text-xl">{reply.emoji}</span>
              </label>
              <button
                onClick={() => handleRemoveReply(reply.id)}
                className="text-gray-500 hover:text-red-500 transition-colors duration-200"
              >
                <FontAwesomeIcon icon={faTimes} className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex items-center space-x-2 mb-6">
          <input
            type="text"
            value={newReply}
            onChange={(e) => setNewReply(e.target.value)}
            placeholder="Add New Reply..."
            className="flex-1 px-3 py-2 bg-gray-100 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-600 outline-none transition-colors duration-200"
          />
          <button
            onClick={handleAddReply}
            className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
          </button>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentRepliesModal;
