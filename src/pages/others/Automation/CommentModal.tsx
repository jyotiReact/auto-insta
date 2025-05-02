import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { setAutomationData } from '../../../store/slices/userSlice';

const CommentRepliesModal: React.FC<{
  onClose: () => void;
  replies: { id: string; text: string; emoji: string }[];
  setReplies: (replies: { id: string; text: string; emoji: string }[]) => void;
}> = ({ onClose, replies, setReplies, nodesData }) => {
  const [selectedReply, setSelectedReply] = useState<string | null>(null);
  const [newReply, setNewReply] = useState('');
  const dispatch = useDispatch();

  const handleAddReply = () => {
    if (newReply.trim() && !replies.some((r) => r.text === newReply.trim())) {
      setReplies([
        ...replies,
        {
          id: String(replies.length + 1),
          text: newReply.trim(),
          emoji: '😄',
        },
      ]);
      // setNewReply('');
    }
    console.log(replies);
  };

  const handleRemoveReply = (id: string) => {
    setReplies(replies.filter((reply) => reply.id !== id));
    if (selectedReply === replies.find((r) => r.id === id)?.text) {
      setSelectedReply(null);
    }
  };
  console.log(replies);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-xl w-[500px] shadow-lg relative border border-pink-200">
        <button
          onClick={() => {
            onClose();
            const data = {
              data: {
                ...nodesData[0].data,
                public_replies:
                  replies.length > 0
                    ? replies.map((r) => `${r.text}`)
                    : [], //send replies
              },
              id: 'trigger',
              position: { x: -135, y: -195 },
              type: 'trigger',
            };
            console.log({data},"reply");
            let updatedNodes = [...nodesData];
            updatedNodes[0] = data;
            dispatch(setAutomationData(updatedNodes));
          }}
          className="absolute top-4 right-4 text-pink-600 hover:text-pink-700 transition-all duration-200 hover:scale-110"
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
              className="flex items-center justify-between p-3 bg-pink-50 rounded-xl hover:-translate-y-1 hover:shadow-md transition-all duration-200"
            >
              <label className="flex items-center space-x-3 flex-1">
                <span className="text-gray-800 text-sm">{reply.text}</span>
                <span className="text-xl">{reply.emoji}</span>
              </label>
              <button
                onClick={() => handleRemoveReply(reply.id)}
                className="text-pink-600 hover:text-pink-700 transition-all duration-200 hover:scale-110"
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
            className="flex-1 px-4 py-2 bg-pink-50 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-600 outline-none transition-all duration-200 text-gray-900 placeholder-gray-400"
          />
          <button
            onClick={handleAddReply}
            className="p-2 bg-pink-600 text-white rounded-xl hover:bg-pink-700 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
          </button>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-pink-600 text-white rounded-xl hover:bg-pink-700 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentRepliesModal;
