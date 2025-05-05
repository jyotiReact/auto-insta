import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faMessage,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import SetupMessagesModal from './SetupMessageModal';

interface ButtonData {
  title: string;
  url: string;
}

interface FollowMessage {
  openingMessage: string;
  openingButton: ButtonData;
  followingMessage: string;
  followingButtons: [ButtonData, ButtonData];
}

interface NextStepComponentProps {
  handleBack: () => void;
  nodesData: any;
  setNodesData: (data: any) => void;
}

interface CustomMessageModalProps {
  onClose: () => void;
  message: string;
  buttonData: ButtonData | [ButtonData, ButtonData];
  setFollowMessage: (data: Partial<FollowMessage>) => void;
  title: string;
  isFollowingMessage: boolean;
}

const CustomMessageModal: React.FC<CustomMessageModalProps> = ({
  onClose,
  message,
  buttonData,
  setFollowMessage,
  title,
  isFollowingMessage,
}) => {
  const [text, setText] = useState(message);
  const [button1, setButton1] = useState<ButtonData>(
    Array.isArray(buttonData) ? buttonData[0] : buttonData,
  );
  const [button2, setButton2] = useState<ButtonData>(
    Array.isArray(buttonData) ? buttonData[1] : { title: '', url: '' },
  );

  const handleSave = () => {
    if (isFollowingMessage) {
      setFollowMessage({
        followingMessage: text,
        followingButtons: [button1, button2],
      });
    } else {
      setFollowMessage({
        openingMessage: text,
        openingButton: button1,
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-xl w-[500px] shadow-lg relative border border-pink-200 animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-pink-600 hover:text-pink-700 transition-all duration-200 hover:scale-110"
        >
          <FontAwesomeIcon icon={faTimes} className="h-5 w-5" />
        </button>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">{title}</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your message..."
            className="w-full px-4 py-2 bg-pink-50 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-600 outline-none transition-all duration-200 text-gray-900 placeholder-gray-400"
            rows={4}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Button 1 Label
          </label>
          <input
            type="text"
            value={button1.title}
            onChange={(e) => setButton1({ ...button1, title: e.target.value })}
            placeholder="Enter button label..."
            className="w-full px-4 py-2 bg-pink-50 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-600 outline-none transition-all duration-200 text-gray-900 placeholder-gray-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Button 1 Link
          </label>
          <input
            type="url"
            value={button1.url}
            onChange={(e) => setButton1({ ...button1, url: e.target.value })}
            placeholder="Enter button link..."
            className="w-full px-4 py-2 bg-pink-50 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-600 outline-none transition-all duration-200 text-gray-900 placeholder-gray-400"
          />
        </div>
        {isFollowingMessage && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Button 2 Label
              </label>
              <input
                type="text"
                value={button2.title}
                onChange={(e) =>
                  setButton2({ ...button2, title: e.target.value })
                }
                placeholder="Enter button label..."
                className="w-full px-4 py-2 bg-pink-50 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-600 outline-none transition-all duration-200 text-gray-900 placeholder-gray-400"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Button 2 Link
              </label>
              <input
                type="url"
                value={button2.url}
                onChange={(e) =>
                  setButton2({ ...button2, url: e.target.value })
                }
                placeholder="Enter button link..."
                className="w-full px-4 py-2 bg-pink-50 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-600 outline-none transition-all duration-200 text-gray-900 placeholder-gray-400"
              />
            </div>
          </>
        )}
        <div className="flex justify-end space-x-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 rounded-lg hover:bg-pink-50 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-pink-600 text-white rounded-xl hover:bg-pink-700 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const NextStepComponent: React.FC<NextStepComponentProps> = ({
  handleBack,
  nodesData,
  setNodesData,
}) => {
  const [isDraft, setIsDraft] = useState(false);
  const [openMessageModal, setOpenMessageModal] = useState(false);
  const [openCustomMessageModal, setOpenCustomMessageModal] = useState(false);
  const [customMessageIndex, setCustomMessageIndex] = useState<0 | 1 | 2>(0);
  const [messages, setMessages] = useState('');
  const [followMesssage, setFollowMesssage] = useState<FollowMessage>({
    openingMessage: '',
    openingButton: { title: 'Send me a link', url: '' },
    followingMessage: '',
    followingButtons: [
      { title: 'Visit Profile', url: '' },
      { title: 'I am following', url: '' },
    ],
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log(messages, followMesssage);
    const withButtonTypes = (button: ButtonData) => ({
      ...button,
      type: button.url ? 'web_url' : 'postback',
    });

    setNodesData({
      ...nodesData,
      checkFollowing: isDraft,
      openingMessage: {
        type: 'button',
        text: followMesssage.openingMessage,
        buttons: withButtonTypes(followMesssage.openingButton),
      },
      followingMessage: {
        type: 'button',
        text: followMesssage.followingMessage,
        buttons:followMesssage.followingButtons.map(withButtonTypes)
        ,
      },
    });
  }, [isDraft, messages, followMesssage]);

  const handleOpenCustomModal = (index: 1 | 2) => {
    setCustomMessageIndex(index);
    setOpenCustomMessageModal(true);
  };

  useEffect(() => {
    // const token =
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbnN0YVVzZXJJZCI6IjE3ODQxNDcyNjkzMDc5NjAxIiwiaWF0IjoxNzQ2NDMzMTg0LCJleHAiOjE3NDcwMzc5ODR9.Mp5Ci1YROqKvbuZ4y1SmgdC0cixtctEISH7TwFHltRU';
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
        setFollowMesssage((prev) => ({
          ...prev,
          openingMessage: data.openingMessageText,
          followingMessage: data.followUpText,
        }));
      } catch (err) {
        setError('Error fetching default messages');
        console.error(err);
      }
    }
    fetchDefaultMessages();
  }, []);

  return (
    <div className="pb-40">
      <div className="flex items-center justify-between mb-6 border-b pb-4 border-pink-600">
        <div className="flex items-center space-x-3">
          <button
            onClick={handleBack}
            className="p-2 w-10 h-10 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-600 transition-colors duration-200"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="h-5 w-5" />
          </button>
          <div>
            <p className="text-sm text-gray-500 mt-1">Instagram</p>
            <h2 className="text-md font-bold text-gray-900">
              Send Instagram Message
            </h2>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <p>Automatically ask for a follow</p>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isDraft}
            onChange={() => setIsDraft(!isDraft)}
          />
          <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-gradient-to-r peer-checked:from-pink-500 peer-checked:to-purple-500 transition-all duration-300" />
          <div className="absolute left-1 bg-white w-4 h-4 rounded-full shadow-sm transition-transform duration-300 peer-checked:translate-x-5" />
        </label>
      </div>
      {isDraft && (
        <div className="space-y-6 mb-6">
          <div>
            <p className="mb-2">Opening Message</p>
            <div
              className="border-2 border-dashed border-gray-300 rounded-xl text-center cursor-pointer hover:bg-pink-50 hover:border-pink-400 transition-all duration-300 group"
              onClick={() => handleOpenCustomModal(1)}
            >
              {followMesssage.openingMessage ? (
                <div className="p-4">
                  <span className="font-medium text-gray-800 block mb-3">
                    {followMesssage.openingMessage}
                  </span>
                  <div className="flex">
                    <a
                      href={followMesssage.openingButton.url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full font-medium py-2 px-4 rounded-lg transition-colors duration-200 border-pink-600 border border-dashed text-pink-600 focus:outline-none focus:ring-2 focus:ring-[#E1306C] focus:ring-opacity-50"
                    >
                      {followMesssage.openingButton.title}
                    </a>
                  </div>
                </div>
              ) : (
                <div className="p-4">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-pink-200 transition-colors duration-200">
                    <FontAwesomeIcon
                      icon={faMessage}
                      className="text-xl text-pink-600"
                    />
                  </div>
                  <span className="font-medium text-pink-600">
                    Setup Opening Message
                  </span>
                </div>
              )}
            </div>
            {/* <button
              onClick={() => handleOpenCustomModal(1)}
              className="mt-2 px-4 py-2 bg-pink-600 text-white rounded-xl hover:bg-pink-700 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              {followMesssage.openingMessage ? 'Edit Message' : 'Setup Message'}
            </button> */}
          </div>
          <div>
            <p className="mb-2">Follow check message</p>
            <div
              className="border-2 border-dashed border-gray-300 rounded-xl text-center cursor-pointer hover:bg-pink-50 hover:border-pink-400 transition-all duration-300 group"
              onClick={() => handleOpenCustomModal(2)}
            >
              {followMesssage.followingMessage ? (
                <div className="p-4">
                  <span className="font-medium text-gray-800 block mb-3">
                    {followMesssage.followingMessage}
                  </span>
                  <div className="flex gap-2 flex-col">
                    <a
                      href={followMesssage.followingButtons[0].url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full font-medium py-2 px-1 rounded-lg transition-colors duration-200 border-pink-600 border border-dashed text-pink-600 focus:outline-none focus:ring-2 focus:ring-[#E1306C] focus:ring-opacity-50 mb-2"
                    >
                      {followMesssage.followingButtons[0].title}
                    </a>
                    <a
                      href={followMesssage.followingButtons[1].url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full font-medium py-2 px-1 rounded-lg transition-colors duration-200 border-pink-600 border border-dashed text-pink-600 focus:outline-none focus:ring-2 focus:ring-[#E1306C] focus:ring-opacity-50"
                    >
                      {followMesssage.followingButtons[1].title}
                    </a>
                  </div>
                </div>
              ) : (
                <div className="p-4">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-pink-200 transition-colors duration-200">
                    <FontAwesomeIcon
                      icon={faMessage}
                      className="text-xl text-pink-600"
                    />
                  </div>
                  <span className="font-medium text-pink-600">
                    Setup Following Message
                  </span>
                </div>
              )}
            </div>
            {/* <button
              onClick={() => handleOpenCustomModal(2)}
              className="mt-2 px-4 py-2 bg-pink-600 text-white rounded-xl hover:bg-pink-700 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              {followMesssage.followingMessage
                ? 'Edit Message'
                : 'Setup Message'}
            </button> */}
          </div>
        </div>
      )}
      <div>
        <p className="mb-2">Add content for your message</p>
        <div
          className="border-2 border-dashed border-gray-300 rounded-xl text-center cursor-pointer hover:bg-pink-50 hover:border-pink-400 transition-all duration-300 group"
          onClick={() => setOpenMessageModal(true)}
        >
          {messages?.length > 0 ? (
            <div className="p-4 w-full text-left">{messages}</div>
          ) : (
            <div className="p-4">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-pink-200 transition-colors duration-200">
                <FontAwesomeIcon
                  icon={faMessage}
                  className="text-xl text-pink-600"
                />
              </div>
              <span className="font-medium text-pink-600">Setup Messages</span>
            </div>
          )}
        </div>
      </div>
      {openMessageModal && (
        <SetupMessagesModal
          onClose={() => setOpenMessageModal(false)}
          setMessages={setMessages}
          messages={messages}
          nodesData={nodesData}
          setNodesData={setNodesData}
        />
      )}
      {openCustomMessageModal && customMessageIndex !== 0 && (
        <CustomMessageModal
          onClose={() => {
            setOpenCustomMessageModal(false);
            setCustomMessageIndex(0);
          }}
          message={
            customMessageIndex === 1
              ? followMesssage.openingMessage
              : followMesssage.followingMessage
          }
          buttonData={
            customMessageIndex === 1
              ? followMesssage.openingButton
              : followMesssage.followingButtons
          }
          setFollowMessage={(data) =>
            setFollowMesssage((prev) => ({ ...prev, ...data }))
          }
          title={
            customMessageIndex === 1
              ? 'Edit Opening Message'
              : 'Edit Follow Check Message'
          }
          isFollowingMessage={customMessageIndex === 2}
        />
      )}
      {/* {error && <p className="text-red-500 text-sm mt-4">{error}</p>} */}
    </div>
  );
};

export default NextStepComponent;
