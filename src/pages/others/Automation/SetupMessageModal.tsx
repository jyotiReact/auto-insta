import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faCloudUploadAlt,
  faComment,
  faFileAlt,
  faImage,
  faPen,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAutomationData } from '../../../store/slices/userSlice';

const SetupMessagesModal = ({
  onClose,
  setMessageData,
  messageData,
  nodesData,
}) => {
  const [showTextContent, setShowTextContent] = useState(false);
  const [showCardContent, setShowCardContent] = useState(false);
  const [showButtonInputs, setShowButtonInputs] = useState(false);
  const [buttonLabel, setButtonLabel] = useState('');
  const [buttonLink, setButtonLink] = useState('');
  const [messages, setMessages] = useState('');
  const dispatch = useDispatch();

  const handleAddButtonClick = () => {
    setShowButtonInputs(true);
  };

  const handleSaveButton = () => {
    console.log('Saved:', { buttonLabel, buttonLink });
    setShowButtonInputs(false);
    setButtonLabel('');
    setButtonLink('');
  };

  const handleCancelButton = () => {
    setShowButtonInputs(false);
    setButtonLabel('');
    setButtonLink('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-lg overflow-hidden max-h-[500px]  ">
        {/* Header */}
        <div className="bg-white p-4 text-pink-600">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Setup Messages</h2>
            <button
              onClick={onClose}
              className="text-pink-600 hover:text-pink-200 transition-colors"
            >
              ✕
            </button>
          </div>
          <p className="text-sm opacity-90 mt-1 ">
            Add one of the content blocks below.
          </p>
        </div>

        {!showTextContent && !showCardContent && (
          <div className="p-4">
            {/* Divider */}
            <div className="border-b border-pink-600 my-3"></div>

            {/* Text Option */}
            <div
              className="flex items-start p-3 rounded-lg hover:bg-pink-50 cursor-pointer transition-colors"
              onClick={() => setShowTextContent(!showTextContent)}
            >
              <div className="bg-pink-100 text-pink-600 p-3 rounded-lg mr-3">
                <FontAwesomeIcon icon={faComment} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Text</h3>
                <p className="text-sm text-gray-500">Simple text & buttons</p>
              </div>
            </div>

            {/* Card Option */}
            <div
              className="flex items-start p-3 rounded-lg hover:bg-pink-50 cursor-pointer transition-colors mt-2"
              onClick={() => {
                setShowCardContent(!showCardContent);
                showTextContent && setShowTextContent(!showTextContent);
              }}
            >
              <div className="bg-pink-100 text-pink-600 p-3 rounded-lg mr-3">
                <FontAwesomeIcon icon={faImage} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Card</h3>
                <p className="text-sm text-gray-500">Image, text & buttons</p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-b border-gray-200 my-3"></div>
          </div>
        )}
        {(showTextContent || showCardContent) && (
          <div className=" mx-auto bg-white rounded-2xl overflow-auto h-[400px]   p-4">
            {/* Back Button */}
            <div className="mb-2">
              <button
                className="flex items-center border-dashed border border-pink-600 py-2 px-4 rounded-lg text-pink-700 hover:text-pink-800 transition-colors"
                onClick={() => {
                  setShowTextContent(false);
                  setShowCardContent(false);
                }}
              >
                <span className="text-lg font-medium">Change Template</span>
              </button>
            </div>

            {/* Text Input Section */}
            <div className="border border-pink-600 rounded-lg p-2">
              {showCardContent ? (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-pink-700 mb-1">
                    <FontAwesomeIcon icon={faFileAlt} className="mr-2" />
                    Upload Card Image
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    JPG, PNG up to 2MB
                  </p>

                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-pink-200 rounded-lg bg-pink-50 hover:bg-pink-100 transition-colors">
                    <div className="space-y-1 text-center">
                      <FontAwesomeIcon
                        icon={faCloudUploadAlt}
                        className="mx-auto h-12 w-12 text-pink-400"
                      />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md font-medium text-pink-600 hover:text-pink-500 focus-within:outline-none"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            accept="image/jpeg,image/png"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG up to 2MB
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <input
                    className="w-full px-4 py-3 border-none rounded-lg bg-white  outline-none transition-colors"
                    placeholder="Type your message here..."
                    onChange={(e) => setMessages(e.target.value)}
                  />
                  <button className="absolute bottom-3 right-3 text-pink-500 hover:text-pink-600 transition-colors">
                    <FontAwesomeIcon icon={faPen} size="sm" />
                  </button>
                </div>
              )}
              {/* Add Button Section */}
              <div className="mb-4 mt-4 mx-4 border border-dashed p-2 border-pink-600 rounded-t-lg ">
                {showButtonInputs && (
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-pink-700 mb-2">
                      Add Button
                    </label>
                    <div className="flex justify-end space-x-3">
                      <button
                        className="px-4 py-1 text-pink-700 rounded-lg border border-pink-300 hover:bg-pink-50 transition-colors"
                        onClick={handleCancelButton}
                      >
                        Cancel
                      </button>
                      <button
                        className="px-4 py-1 bg-pink-500 text-white rounded-lg hover:bg-pink-600 focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 transition-colors"
                        onClick={handleSaveButton}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                )}
                {!showButtonInputs ? (
                  <button
                    className="w-full flex items-center justify-center py-3 px-4 border-2 border-dashed border-pink-300 rounded-lg hover:border-pink-400 hover:bg-pink-50 transition-colors"
                    onClick={handleAddButtonClick}
                  >
                    <FontAwesomeIcon
                      icon={faPlus}
                      className="mr-2 text-pink-500"
                    />
                    <span className="text-pink-600 font-medium">
                      Add Button
                    </span>
                  </button>
                ) : (
                  <div className="space-y-2">
                    <div>
                      <label className="block text-sm font-medium text-pink-700 mb-1">
                        Button Label
                      </label>
                      <input
                        type="text"
                        value={buttonLabel}
                        onChange={(e) => setButtonLabel(e.target.value)}
                        className="w-full px-4 py-2 border border-pink-200 rounded-lg bg-white focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-colors"
                        placeholder="Enter button label"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-pink-700 mb-1">
                        Button Link
                      </label>
                      <input
                        type="text"
                        value={buttonLink}
                        onChange={(e) => setButtonLink(e.target.value)}
                        className="w-full px-4 py-2 border border-pink-200 rounded-lg bg-white focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-colors"
                        placeholder="Enter button link"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3">
                <button
                  className="w-full  bg-pink-600 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center  transition-all shadow-md"
                  onClick={() => {
                    setMessageData({ ...messageData, text: messages });
                    const data = {
                      data: {
                        check_following: false,
                        check_following_message: null,
                        instagram_message: {
                          attachment: messageData?.attachment || null,
                          text: messages?.text || '',
                        },
                        opening_message: null,
                        type: 'SEND_INSTAGRAM_DM',
                      },
                      id: '78b473db-3ace-4a48-a6e6-8bd46e9642d7',
                      position: { x: 15, y: 55 },
                      type: 'instagram_action',
                    };
                    let updatedNodes = [...nodesData];
                    updatedNodes[1] = data;

                    dispatch(setAutomationData(updatedNodes));
                    onClose();
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        {showTextContent && (
          <div className=" mx-auto bg-white rounded-2xl overflow-auto h-[400px]   p-4">
            {/* Back Button */}
            <div className="mb-2">
              <button
                className="flex items-center border-dashed border border-pink-600 py-2 px-4 rounded-lg text-pink-700 hover:text-pink-800 transition-colors"
                onClick={() => console.log('Back clicked')}
              >
                <span className="text-lg font-medium">Change Template</span>
              </button>
            </div>

            {/* Text Input Section */}
            <div className="border border-pink-600 rounded-lg p-2">
              {showCardContent ? (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-pink-700 mb-1">
                    <FontAwesomeIcon icon={faFileAlt} className="mr-2" />
                    Upload Card Image
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    JPG, PNG up to 2MB
                  </p>

                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-pink-200 rounded-lg bg-pink-50 hover:bg-pink-100 transition-colors">
                    <div className="space-y-1 text-center">
                      <FontAwesomeIcon
                        icon={faCloudUploadAlt}
                        className="mx-auto h-12 w-12 text-pink-400"
                      />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md font-medium text-pink-600 hover:text-pink-500 focus-within:outline-none"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            accept="image/jpeg,image/png"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG up to 2MB
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <input
                    className="w-full px-4 py-3 border-none rounded-lg bg-white  outline-none transition-colors"
                    placeholder="Type your message here..."
                    onChange={(e) => setMessages(e.target.value)}
                  />
                  <button className="absolute bottom-3 right-3 text-pink-500 hover:text-pink-600 transition-colors">
                    <FontAwesomeIcon icon={faPen} size="sm" />
                  </button>
                </div>
              )}
              {/* Add Button Section */}
              <div className="mb-4 mt-4 mx-4 border border-dashed p-2 border-pink-600 rounded-t-lg ">
                {showButtonInputs && (
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-pink-700 mb-2">
                      Add Button
                    </label>
                    <div className="flex justify-end space-x-3">
                      <button
                        className="px-4 py-1 text-pink-700 rounded-lg border border-pink-300 hover:bg-pink-50 transition-colors"
                        onClick={handleCancelButton}
                      >
                        Cancel
                      </button>
                      <button
                        className="px-4 py-1 bg-pink-500 text-white rounded-lg hover:bg-pink-600 focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 transition-colors"
                        onClick={handleSaveButton}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                )}
                {!showButtonInputs ? (
                  <button
                    className="w-full flex items-center justify-center py-3 px-4 border-2 border-dashed border-pink-300 rounded-lg hover:border-pink-400 hover:bg-pink-50 transition-colors"
                    onClick={handleAddButtonClick}
                  >
                    <FontAwesomeIcon
                      icon={faPlus}
                      className="mr-2 text-pink-500"
                    />
                    <span className="text-pink-600 font-medium">
                      Add Button
                    </span>
                  </button>
                ) : (
                  <div className="space-y-2">
                    <div>
                      <label className="block text-sm font-medium text-pink-700 mb-1">
                        Button Label
                      </label>
                      <input
                        type="text"
                        value={buttonLabel}
                        onChange={(e) => setButtonLabel(e.target.value)}
                        className="w-full px-4 py-2 border border-pink-200 rounded-lg bg-white focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-colors"
                        placeholder="Enter button label"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-pink-700 mb-1">
                        Button Link
                      </label>
                      <input
                        type="text"
                        value={buttonLink}
                        onChange={(e) => setButtonLink(e.target.value)}
                        className="w-full px-4 py-2 border border-pink-200 rounded-lg bg-white focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-colors"
                        placeholder="Enter button link"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
            
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SetupMessagesModal;
