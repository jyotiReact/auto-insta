import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faMessage } from '@fortawesome/free-solid-svg-icons/faMessage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import SetupMessagesModal from './SetupMessageModal';

function NextStepComponent({ handleBack }) {
  const [isDraft, setIsDraft] = useState(false);
  const [openMessageModal, setOpenMessageModal] = useState(false);
  const [messageData, setMessageData] = useState(null);
  return (
    <div className=" pb-40">
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
      <div className="flex justify-between items-center mb-4 ">
        <p>Automatically ask for a follow</p>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isDraft}
            onChange={() => setIsDraft(!isDraft)}
          />
          <div className="w-10 h-5 bg-gray-200 rounded-full peer  peer-checked:bg-gradient-to-r peer-checked:from-pink-500 peer-checked:to-purple-500 transition-all duration-300"></div>
          <div className="absolute left-1  bg-white w-4 h-4 rounded-full shadow-sm transition-transform duration-300 peer-checked:translate-x-5"></div>
        </label>
      </div>

      <div>
        <p className="mb-2">Add content for your message</p>
        <div
          className="border-2 border-dashed border-gray-300 rounded-xl text-center cursor-pointer hover:bg-pink-50 hover:border-pink-400 transition-all duration-300 group"
          onClick={() => setOpenMessageModal(!openMessageModal)}
        >
          {messageData?.text?.length > 0 ? (
            <div className='p-4 w-full text-left'>{messageData.text}</div>
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
          setMessageData={setMessageData}
          messageData={messageData}
        />
      )}
    </div>
  );
}

export default NextStepComponent;
