import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import Select from 'react-select';

interface Reply {
  id: string;
  text: string;
  emoji: string;
}

interface DefaultMessage {
  id: string;
  text: string;
}

interface CommentRepliesModalProps {
  onClose: () => void;
  replies: Reply[];
  setReplies: (replies: Reply[]) => void;
  nodesData: any[];
  setNodesData: (nodes: any[]) => void;
}

const CommentRepliesModal: React.FC<CommentRepliesModalProps> = ({
  onClose,
  replies,
  setReplies,
  nodesData,
  setNodesData,
}) => {
  const [selectedOption, setSelectedOption] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [defaultMessages, setDefaultMessages] = useState<DefaultMessage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const token = useSelector((state: any) => state.user.userData.token);

  const handleAddReply = () => {
    if (
      selectedOption &&
      !replies.some((r) => r.text === selectedOption.label)
    ) {
      setReplies([
        ...replies,
        {
          id: String(replies.length + 1),
          text: selectedOption.label,
          emoji: '😄',
        },
      ]);
      setSelectedOption(null); // Clear selection after adding
    }
  };

  const handleRemoveReply = (id: string) => {
    setReplies(replies.filter((reply) => reply.id !== id));
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddKeyword();
    }
  };
  const handleConfirm = () => {
    setNodesData({
      ...nodesData,
      trigger: {
        ...nodesData.trigger,
        commentReplies: replies.length > 0 ? replies.map((r) => r.text) : [],
      },
    });

    onClose();
  };

  useEffect(() => {
    let token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbnN0YVVzZXJJZCI6IjE3ODQxNDcyNjkzMDc5NjAxIiwiaWF0IjoxNzQ2NDMzMTg0LCJleHAiOjE3NDcwMzc5ODR9.Mp5Ci1YROqKvbuZ4y1SmgdC0cixtctEISH7TwFHltRU';
    async function fetchDefaultMessages() {
      try {
        const response = await fetch(
          'https://instautomate.it-waves.com/user/get-default-data',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (!response.ok) {
          throw new Error('Failed to fetch default messages');
        }

        const data = await response.json();
        console.log(data);
        // Assuming data is an array of { id: string, text: string }
        setDefaultMessages(data.automatedReplies);
      } catch (err) {
        setError('Error fetching default messages');
        console.error(err);
      }
    }
    fetchDefaultMessages();
  }, [token]);

  // Format default messages for react-select
  const selectOptions = (defaultMessages || []).map((message) => ({
    value: message,
    label: message,
  }));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-xl w-[500px] shadow-lg relative border border-pink-200 animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-pink-600 hover:text-pink-700 transition-all duration-200 hover:scale-110"
        >
          <FontAwesomeIcon icon={faTimes} className="h-5 w-5" />
        </button>

        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Setup Comment Replies
        </h2>

        <div className="space-y-4 mb-6">
          <p className="text-sm text-gray-600">Select Random Comment Replies</p>
          {replies.map((reply) => (
            <div
              key={reply.id}
              className="flex items-center justify-between p-3 bg-pink-50 rounded-xl hover:-translate-y-1 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center space-x-3 flex-1">
                <span className="text-gray-800 text-sm">{reply.text}</span>
                <span className="text-xl">{reply.emoji}</span>
              </div>
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
          <div className="flex-1">
            <Select
              options={selectOptions}
              value={selectedOption}
              onChange={setSelectedOption}
              placeholder="Select a reply..."
              className="text-gray-900"
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: '#FFF5F5',
                  borderColor: '#FECDD3',
                  borderRadius: '0.75rem',
                  padding: '0.25rem',
                  '&:hover': { borderColor: '#FECDD3' },
                  boxShadow: 'none',
                }),
                input: (base) => ({
                  ...base,
                  color: '#1F2937',
                }),
                placeholder: (base) => ({
                  ...base,
                  color: '#9CA3AF',
                }),
                singleValue: (base) => ({
                  ...base,
                  color: '#1F2937',
                }),
                menu: (base) => ({
                  ...base,
                  borderRadius: '0.75rem',
                  marginTop: '0.5rem',
                }),
                option: (base, { isFocused }) => ({
                  ...base,
                  backgroundColor: isFocused ? '#FECDD3' : 'white',
                  color: '#1F2937',
                  borderRadius: '0.5rem',
                  margin: '0.25rem',
                  padding: '0.5rem',
                }),
              }}
              onKeyDown={handleKeyDown}
            />
          </div>
          <button
            onClick={handleAddReply}
            disabled={!selectedOption}
            className={`p-2 rounded-xl transition-all duration-200 ${
              selectedOption
                ? 'bg-pink-600 text-white hover:bg-pink-700 hover:-translate-y-1 hover:shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="flex justify-end">
          <button
            onClick={handleConfirm}
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
