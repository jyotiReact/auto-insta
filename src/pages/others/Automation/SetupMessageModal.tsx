import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faCloudUploadAlt,
  faComment,
  faFileAlt,
  faImage,
  faPen,
  faPlus,
  faTimes,
  faTrash,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';
import { IMAGE_BASE_URL } from '../../../components/constants';
import { useParams } from 'react-router-dom';

interface ButtonData {
  title: string;
  url: string;
  type?: 'web_url' | 'postback';
}

interface SetupMessagesModalProps {
  onClose: () => void;
  setNodesData: (nodes: any[]) => void;
  nodesData: any[];
}
const SetupMessagesModal: React.FC<SetupMessagesModalProps> = ({
  onClose,
  nodesData,
  setNodesData,
  buttons,
  setButtons,
  setPreview,
  preview,
}) => {
  const [showTextContent, setShowTextContent] = useState(false);
  const [showCardContent, setShowCardContent] = useState(false);
  const [showButtonInputs, setShowButtonInputs] = useState(false);
  const [currentButton, setCurrentButton] = useState<ButtonData>({
    title: '',
    // url: '',
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const { automationId } = useParams();

  // Helper function to update nodesData with text or card content
  const updateNodesData = (field: string, value: string) => {
    setNodesData((prev) => ({
      ...prev,
      instagramCardMessage: showCardContent
        ? {
            ...prev.instagramCardMessage,
            [field]: value,
          }
        : prev.instagramCardMessage,
      instagramTextBtnMessage: showTextContent
        ? {
            ...prev.instagramTextBtnMessage,
            text:
              field === 'title' ? value : prev.instagramTextBtnMessage?.text,
          }
        : prev.instagramTextBtnMessage,
    }));
  };

  const handleAddButtonClick = () => {
    setShowButtonInputs(true);
    setCurrentButton({ title: '' });
    setEditIndex(null);
  };

  const handleSaveButton = () => {
    if (currentButton.title) {
      const btnData = {
        ...currentButton,
        type: currentButton?.url ? 'web_url' : 'postback',
      };
      if (editIndex !== null) {
        const updatedButtons = [...buttons];
        updatedButtons[editIndex] = btnData;
        setButtons(updatedButtons);
      } else {
        setButtons([...buttons, btnData]);
      }
      setShowButtonInputs(false);
      setCurrentButton({ title: '' });
      setEditIndex(null);
    }
  };
  useEffect(() => {
    if (automationId) {
      setButtons(nodesData?.instagramCardMessage?.buttons || []);
      nodesData?.instagramTextBtnMessage?.buttons?.length &&
        setButtons(nodesData?.instagramTextBtnMessage?.buttons);
      if (nodesData?.instagramCardMessage) {
        setShowCardContent(true);
      }
      if (nodesData?.instagramTextBtnMessage) {
        setShowTextContent(true);
      }
    }
  }, [automationId]);

  const handleCancelButton = () => {
    setShowButtonInputs(false);
    setCurrentButton({ title: '' });
    setEditIndex(null);
  };

  const handleEditButton = (index: number) => {
    setCurrentButton(buttons[index]);
    setEditIndex(index);
    setShowButtonInputs(true);
  };

  const handleRemoveButton = (index: number) => {
    setButtons(buttons.filter((_, i) => i !== index));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setUploadedFile(file);

    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleConfirm = () => {
    setNodesData((prev) => ({
      ...prev,
      instagramCardMessage: showCardContent
        ? {
            ...prev.instagramCardMessage,
            ...(buttons.length > 0 && { buttons }),
          }
        : null,
      instagramTextBtnMessage: showTextContent
        ? {
            type: buttons.length > 0 ? 'button' : 'text',
            text: prev.instagramTextBtnMessage?.text || '',
            ...(buttons.length > 0 && { buttons }),
          }
        : null,
      uploadedFile,
      preview,
    }));

    onClose();
  };
  // Get current title and subtitle from nodesData
  const currentTitle = showTextContent
    ? nodesData?.instagramTextBtnMessage?.text || ''
    : nodesData?.instagramCardMessage?.title || '';
  const currentSubtitle = nodesData?.instagramCardMessage?.subTitle || '';
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto shadow-2xl border border-pink-200 animate-fade-in">
        {/* Header */}
        <div className="bg-white p-4 border-b border-pink-600">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Setup Messages</h2>
            <button
              onClick={onClose}
              className="text-pink-600 hover:text-pink-700 transition-all duration-200 hover:scale-110"
            >
              <FontAwesomeIcon icon={faTimes} className="h-5 w-5" />
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Add one of the content blocks below.
          </p>
        </div>

        {!showTextContent && !showCardContent ? (
          <div className="p-4">
            {/* Text Option */}
            <div
              className="flex items-start p-3 rounded-lg hover:bg-pink-50 cursor-pointer transition-colors"
              onClick={() => setShowTextContent(true)}
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
                setShowCardContent(true);
                setShowTextContent(false);
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
            <div className="border-b border-pink-200 my-3" />
          </div>
        ) : (
          <div className="p-4">
            {/* Back Button */}
            <div className="mb-4">
              <button
                className="flex items-center border-dashed border border-pink-600 py-2 px-4 rounded-lg text-pink-700 hover:text-pink-800 transition-all duration-200"
                onClick={() => {
                  setShowTextContent(false);
                  setShowCardContent(false);
                }}
              >
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                <span className="text-lg font-medium">Change Template</span>
              </button>
            </div>
            {/* Content Section */}
            <div className="border border-pink-600 rounded-lg p-4">
              {showCardContent ? (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-pink-700 mb-1">
                    <FontAwesomeIcon icon={faFileAlt} className="mr-2" />
                    Upload Card Image
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    JPG, PNG up to 2MB
                  </p>
                  <div className="mt-1 flex justify-center border-2 border-dashed border-pink-200 rounded-lg bg-pink-50 hover:bg-pink-100 transition-all duration-200 focus-within:ring-2 focus-within:ring-pink-400">
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      accept="image/jpeg,image/png"
                      onChange={handleFileUpload}
                    />
                    <label
                      htmlFor="file-upload"
                      className="w-full cursor-pointer"
                    >
                      {(automationId &&
                        nodesData?.instagramCardMessage?.imageUrl) ||
                      preview ? (
                        <div className="relative w-full group">
                          <img
                            src={
                              automationId &&
                              nodesData?.instagramCardMessage?.imageUrl
                                ? IMAGE_BASE_URL +
                                  nodesData?.instagramCardMessage?.imageUrl
                                : preview
                            }
                            alt="Uploaded preview"
                            className="max-w-full h-auto max-h-64 object-contain mx-auto rounded"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 flex items-center justify-center transition-all duration-200">
                            <span className="border-dashed border border-pink-600  opacity-0 group-hover:opacity-100 text-sm font-bold text-pink-600 px-2 py-1 rounded">
                              Change Image
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-1 text-center px-6 pt-5 pb-6 w-full">
                          <FontAwesomeIcon
                            icon={faCloudUploadAlt}
                            className="mx-auto h-12 w-12 text-pink-400"
                          />
                          <div className="flex text-sm text-gray-600 justify-center">
                            <span className="relative rounded-md font-medium text-pink-600 hover:text-pink-500">
                              Upload a file
                            </span>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG up to 2MB
                          </p>
                        </div>
                      )}
                    </label>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-pink-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={currentTitle}
                      onChange={(e) => updateNodesData('title', e.target.value)}
                      className="w-full px-4 py-2 border border-pink-200 rounded-lg bg-white focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all duration-200"
                      placeholder="Enter card title"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-pink-700 mb-1">
                      Subtitle
                    </label>
                    <input
                      type="text"
                      value={currentSubtitle}
                      onChange={(e) =>
                        updateNodesData('subTitle', e.target.value)
                      }
                      className="w-full px-4 py-2 border border-pink-200 rounded-lg bg-white focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all duration-200"
                      placeholder="Enter card subtitle"
                    />
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <input
                    className="w-full px-4 py-3 border-none rounded-lg bg-pink-50 outline-none transition-all duration-200 text-gray-900 placeholder-gray-400"
                    placeholder="Type your message here..."
                    value={currentTitle}
                    onChange={(e) => updateNodesData('title', e.target.value)}
                  />
                  <button className="absolute bottom-3 right-3 text-pink-500 hover:text-pink-600 transition-all duration-200">
                    <FontAwesomeIcon icon={faPen} size="sm" />
                  </button>
                </div>
              )}
              {/* Button Inputs */}
              <ButtonInputs
                showButtonInputs={showButtonInputs}
                currentButton={currentButton}
                setCurrentButton={setCurrentButton}
                buttons={buttons}
                editIndex={editIndex}
                onAddButtonClick={handleAddButtonClick}
                onSaveButton={handleSaveButton}
                onCancelButton={handleCancelButton}
                onEditButton={handleEditButton}
                onRemoveButton={handleRemoveButton}
              />
              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 rounded-lg hover:bg-pink-50 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  className="px-4 py-2 bg-pink-600 text-white rounded-lg font-semibold hover:bg-pink-700 hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface ButtonInputsProps {
  showButtonInputs: boolean;
  currentButton: ButtonData;
  setCurrentButton: (button: ButtonData) => void;
  buttons: ButtonData[];
  editIndex: number | null;
  onAddButtonClick: () => void;
  onSaveButton: () => void;
  onCancelButton: () => void;
  onEditButton: (index: number) => void;
  onRemoveButton: (index: number) => void;
}

const ButtonInputs: React.FC<ButtonInputsProps> = ({
  showButtonInputs,
  currentButton,
  setCurrentButton,
  buttons,
  editIndex,
  onAddButtonClick,
  onSaveButton,
  onCancelButton,
  onEditButton,
  onRemoveButton,
}) => (
  <div className="mb-4 mt-4 mx-4 border border-dashed p-2 border-pink-600 rounded-lg">
    {console.log(buttons)}

    {showButtonInputs ? (
      <>
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-pink-700 mb-2">
            {editIndex !== null ? 'Edit Button' : 'Add Button'}
          </label>
          <div className="flex justify-end space-x-3">
            <button
              className="px-4 py-1 text-pink-700 rounded-lg border border-pink-300 hover:bg-pink-50 transition-all duration-200"
              onClick={onCancelButton}
            >
              Cancel
            </button>
            <button
              className="px-4 py-1 bg-pink-600 text-white rounded-lg hover:bg-pink-700 focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 transition-all duration-200"
              onClick={onSaveButton}
            >
              Save
            </button>
          </div>
        </div>
        <div className="space-y-2">
          <div>
            <label className="block text-sm font-medium text-pink-700 mb-1">
              Button Label
            </label>
            <input
              type="text"
              value={currentButton.title}
              onChange={(e) =>
                setCurrentButton({ ...currentButton, title: e.target.value })
              }
              className="w-full px-4 py-2 border border-pink-200 rounded-lg bg-white focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all duration-200"
              placeholder="Enter button label"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-pink-700 mb-1">
              Button Link
            </label>
            <input
              type="text"
              value={currentButton?.url}
              onChange={(e) =>
                setCurrentButton({ ...currentButton, url: e.target.value })
              }
              className="w-full px-4 py2 border border-pink-200 rounded-lg bg-white focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all duration-200"
              placeholder="Enter button link (optional)"
            />
          </div>
        </div>
      </>
    ) : (
      <div>
        {buttons?.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-pink-700 mb-2">
              Added Buttons
            </h4>
            <ul className="space-y-2">
              {buttons?.map((button, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between p-2 bg-pink-50 rounded-lg"
                >
                  <div>
                    <span className="text-sm font-medium text-gray-800">
                      {button?.title}
                    </span>
                    <p className="text-xs text-gray-500">
                      {button?.url || 'No link provided'}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEditButton(index)}
                      className="text-pink-600 hover:text-pink-700 transition-all duration-200"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      onClick={() => onRemoveButton(index)}
                      className="text-pink-600 hover:text-pink-700 transition-all duration-200"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        <button
          className="w-full flex items-center justify-center py-3 px-4 border-2 border-dashed border-pink-300 rounded-lg hover:border-pink-400 hover:bg-pink-50 transition-all duration-200"
          onClick={onAddButtonClick}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2 text-pink-500" />
          <span className="text-pink-600 font-medium">Add Button</span>
        </button>
      </div>
    )}
  </div>
);

export default SetupMessagesModal;
