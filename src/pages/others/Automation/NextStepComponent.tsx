import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faHashtag,
  faHeading,
  faLink,
  faMessage,
  faTimes,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import SetupMessagesModal from './SetupMessageModal';
import { useSelector } from 'react-redux';
import DeleteModal from '../../../components/custom/Modals/DeleteModal';
import { TriggerList } from './TriggerList';
import { actions } from './settings';
import { getApi } from '../../../services/commonServices';
import { useParams } from 'react-router-dom';
import { IMAGE_BASE_URL } from '../../../components/constants';

interface ButtonData {
  title: string;
  url: string;
}

interface FollowMessage {
  openingMessage: string;
  openingButton: ButtonData[]; // Changed from ButtonData to ButtonData[]
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
  buttonData: ButtonData[] | [ButtonData, ButtonData]; // Updated to reflect array for opening button
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
  nodesData,
  setNodesData,
}) => {
  const [text, setText] = useState(message);
  const [button1, setButton1] = useState<ButtonData>(
    Array.isArray(buttonData) ? buttonData[0] : { title: '', url: '' },
  );
  const [button2, setButton2] = useState<ButtonData>(
    Array.isArray(buttonData) ? buttonData[1] : { title: '', url: '' },
  );
  const user = useSelector((state: any) => state.user.userData.info);
  const [showTitleInput1, setShowTitleInput1] = useState(false);
  const [showUrlInput1, setShowUrlInput1] = useState(false);
  const [showTitleInput2, setShowTitleInput2] = useState(false);
  console.log({ button1 });
  const handleSave = () => {
    const instagramUrl = `https://www.instagram.com/${
      user?.username || 'user'
    }`;

    setNodesData({
      ...nodesData,
      checkFollowing: true,
      ...(!isFollowingMessage && {
        openingMessage: {
          type: 'button',
          text: text,
          buttons: [{ ...button1, type: 'postback' }],
        },
      }),
      ...(isFollowingMessage && {
        followingMessage: {
          type: 'button',
          text: text,
          buttons: [
            {
              ...button1,
              url: instagramUrl,
              type: 'web_url',
            },
            {
              ...button2,
              type: 'postback',
            },
          ],
        },
      }),
    });

    // if (isFollowingMessage) {
    //   setFollowMessage({
    //     followingMessage: text,
    //     followingButtons: [
    //       {
    //         ...button1,
    //         url: instagramUrl, // Use existing URL if provided, otherwise use Instagram URL
    //       },
    //       {
    //         ...button2,
    //       },
    //     ],
    //   });
    // } else {
    //   setFollowMessage({
    //     openingMessage: text,
    //     openingButton: [button1],
    //   });
    // }
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

        {/* Message Textarea */}
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

        {/* Button 2 (Only if Following Message) */}
        {isFollowingMessage ? (
          <>
            <div className="mb-4">
              {!showTitleInput1 && !showUrlInput1 ? (
                <button
                  onClick={() => {
                    setShowTitleInput1(true);
                    setShowUrlInput1(true);
                  }}
                  className="px-4 py-2 w-full  text-blue-700 border border-gray-300 rounded-lg transition-all duration-200"
                >
                  {button1?.title}
                </button>
              ) : (
                <div className="space-y-2 mt-2">
                  <div className="relative">
                    <input
                      type="text"
                      value={button1?.title}
                      onChange={(e) =>
                        setButton1({ ...button1, title: e.target.value })
                      }
                      placeholder="Enter button title..."
                      className="w-full pl-10 pr-4 py-1  border border-gray-200 rounded-lg focus:ring-2  outline-none transition-all duration-200"
                    />
                    <FontAwesomeIcon
                      icon={faHashtag}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="url"
                      value={`https://www.instagram.com/${
                        user?.username || 'user'
                      }`}
                      onChange={(e) =>
                        setButton1({ ...button1, url: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-1  border border-gray-200 rounded-lg focus:ring-2 outline-none transition-all duration-200 cursor-not-allowed"
                      disabled
                    />
                    <FontAwesomeIcon
                      icon={faLink}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="mb-4">
              {!showTitleInput2 ? (
                <button
                  onClick={() => setShowTitleInput2(true)}
                  className=" w-full px-4 py-2 text-blue-700 border border-gray-300 rounded-lg  transition-all duration-200"
                >
                  {button2?.title}
                </button>
              ) : (
                <div className="relative">
                  <input
                    type="text"
                    value={button2?.title}
                    onChange={(e) =>
                      setButton2({ ...button2, title: e.target.value })
                    }
                    placeholder="Enter button title..."
                    className="w-full pl-10 pr-4 py-1  border border-gray-200 rounded-lg focus:ring-2  outline-none transition-all duration-200"
                  />
                  <FontAwesomeIcon
                    icon={faHashtag}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
                  />
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="mb-4">
            {!showTitleInput1 ? (
              <button
                onClick={() => setShowTitleInput1(true)}
                className=" w-full px-4 py-2 text-blue-700 border border-gray-300 rounded-lg  transition-all duration-200"
              >
                {button1?.title}
              </button>
            ) : (
              <div className="relative">
                <input
                  type="text"
                  value={button1?.title}
                  onChange={(e) =>
                    setButton1({ ...button1, title: e.target.value })
                  }
                  placeholder="Enter button title..."
                  className="w-full pl-10 pr-4 py-1 border border-gray-200 rounded-lg focus:ring-2 outline-none transition-all duration-200"
                />
                <FontAwesomeIcon
                  icon={faHashtag}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
                />
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
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
  nodesData,
  setNodesData,
  buttons,
  setButtons,
  preview,
  setPreview,
  setNodes,
  setShowNextNode,
  showNextForm,
  setShowNextForm,
}) => {
  const [isDraft, setIsDraft] = useState(false);
  const [openMessageModal, setOpenMessageModal] = useState(false);
  const [openCustomMessageModal, setOpenCustomMessageModal] = useState(false);
  const [customMessageIndex, setCustomMessageIndex] = useState<0 | 1 | 2>(0);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [messageData, setMessageData] = useState(null);
  const [followMesssage, setFollowMesssage] = useState<FollowMessage>({
    openingMessage: '',
    openingButton: nodesData?.openingMessage?.buttons || [
      { title: 'Send me a link' },
    ], // Changed to array
    followingMessage: '',
    followingButtons: nodesData?.followingMessage?.buttons || [
      { title: 'Visit Profile' },
      { title: 'I am following' },
    ],
  });
  const { automationId } = useParams();

  const confirmDelete = () => {
    setNodes((prevNodes) =>
      prevNodes
        .filter((node) => node.type !== 'action')
        .map((node) =>
          node.type === 'trigger'
            ? { ...node, data: { ...node.data, isFirstTrigger: true } }
            : node,
        ),
    );
    setIsDeleteModalOpen(false);
    // setNextNodeStep(false);
    setShowNextNode(false);
    setShowNextForm(false);
    // setShowNextStepInputs(false);
  };

  const handleOpenCustomModal = (index: 1 | 2) => {
    setCustomMessageIndex(index);
    setOpenCustomMessageModal(true);
  };

  useEffect(() => {
    async function fetchDefaultMessages() {
      try {
        const data = await getApi('user/get-default-data');
        setNodesData((prev) => {
          return {
            ...prev,
            openingMessage: {
              ...prev.openingMessage,
              text:
                automationId && nodesData?.openingMessage?.text
                  ? nodesData?.openingMessage?.text
                  : data.openingMessageText,
              // buttons:
              //   automationId && nodesData?.openingMessage?.buttons
              //     ? nodesData?.openingMessage?.buttons
              //     : [{ title: 'Send me a link' }],
            },
            followingMessage: {
              ...prev.followingMessage,
              text:
                automationId && nodesData?.followingMessage?.text
                  ? nodesData?.followingMessage?.text
                  : data.followUpText,
              // buttons:
              //   automationId && nodesData?.followingMessage?.buttons
              //     ? nodesData?.followingMessage?.buttons
              //     : [
              //         { title: 'Visit Profile' },
              //         { title: 'I am following' },
              //       ],
            },
          };
        });

        //  setFollowMesssage((prev) => ({
        //   ...prev,
        //   openingMessage:
        //     automationId && nodesData?.openingMessage
        //       ? nodesData?.openingMessage?.text
        //       : data.openingMessageText,
        //   followingMessage:
        //     automationId && nodesData?.followingMessage
        //       ? nodesData?.followingMessage?.text
        //       : data.followUpText,
        // }));
      } catch (error) {
        console.error('Error fetching automations:', error);
      }
    }
    fetchDefaultMessages();
  }, []);
  console.log(nodesData);
  return (
    <div className="w-[400px]   bg-white overflow-y-auto h-screen">
      <div className="p-6 h-full">
        <div className="flex items-center justify-between mb-6 border-b pb-4 border-pink-600">
          <div className="flex items-center justify-between w-full">
            <div>
              {showNextForm ? (
                <p className="text-sm text-gray-500 mt-1">Instagram</p>
              ) : (
                <h2 className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Next Step
                </h2>
              )}
              {showNextForm ? (
                <h2 className="text-md font-bold text-gray-900">
                  Send Instagram Message
                </h2>
              ) : (
                <p className="text-sm text-gray-500 mt-2">
                  Set the next block in the workflow
                </p>
              )}
            </div>

            <DeleteModal
              isOpen={isDeleteModalOpen}
              onClose={() => setIsDeleteModalOpen(false)}
              onConfirm={confirmDelete}
              title="Delete Node?"
              description="Are you sure you want to delete this node?"
              setIsDeleteModalOpen={setIsDeleteModalOpen}
            />
          </div>
        </div>
        {showNextForm ? (
          <div className="pb-40">
            <div className="flex justify-between items-center mb-4">
              <p>Automatically ask for a follow</p>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={
                    automationId && nodesData?.checkFollowing
                      ? nodesData?.checkFollowing
                      : isDraft
                  }
                  onChange={() => {
                    if (automationId) {
                      console.log('enter');
                      setNodesData((prev) => ({
                        ...prev,
                        checkFollowing: !prev.checkFollowing,
                      }));
                    } else {
                      setIsDraft(!isDraft);
                      setNodesData((prev) => ({
                        ...prev,
                        checkFollowing: !isDraft,
                      }));
                    }
                  }}
                />
                <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-gradient-to-r peer-checked:from-pink-500 peer-checked:to-purple-500 transition-all duration-300" />
                <div className="absolute left-1 bg-white w-4 h-4 rounded-full shadow-sm transition-transform duration-300 peer-checked:translate-x-5" />
              </label>
            </div>
            {((automationId && nodesData?.checkFollowing) || isDraft) && (
              <div className="space-y-6 mb-6">
                <div>
                  <p className="mb-2">Opening Message</p>
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-xl text-center cursor-pointer hover:bg-pink-50 hover:border-pink-400 transition-all duration-300 group"
                    onClick={() => handleOpenCustomModal(1)}
                  >
                    {nodesData?.openingMessage ? (
                      <div className="p-4">
                        <span className="font-medium text-gray-800 block mb-3">
                          {nodesData?.openingMessage?.text}
                        </span>
                        <div className="flex flex-col gap-2">
                          {(automationId &&
                          nodesData?.openingMessage?.buttons?.length
                            ? nodesData?.openingMessage?.buttons
                            : [{ title: 'Send me link' }]
                          ).map((button, index) => (
                            <a
                              key={index}
                              href={'#'}
                              rel="noopener noreferrer"
                              className="w-full font-medium py-2 px-4 rounded-lg transition-colors duration-200 border-pink-600 border border-dashed text-pink-600 focus:outline-none focus:ring-2 focus:ring-[#E1306C] focus:ring-opacity-50"
                            >
                              {button?.title}
                            </a>
                          ))}
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
                </div>
                <div>
                  <p className="mb-2">Follow check message</p>
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-xl text-center cursor-pointer hover:bg-pink-50 hover:border-pink-400 transition-all duration-300 group"
                    onClick={() => handleOpenCustomModal(2)}
                  >
                    {nodesData?.followingMessage ? (
                      <div className="p-4">
                        <span className="font-medium text-gray-800 block mb-3">
                          {nodesData?.followingMessage?.text}
                        </span>
                        <div className="flex gap-2 flex-col">
                          {(automationId &&
                          nodesData?.followingMessage?.buttons?.length
                            ? nodesData?.followingMessage?.buttons
                            : [
                                { title: 'Visit Profile' },
                                { title: 'I am following' },
                              ]
                          ).map((button, index) => (
                            <a
                              href={'#'}
                              key={index}
                              rel="noopener noreferrer"
                              className="w-full font-medium py-2 px-1 rounded-lg transition-colors duration-200 border-pink-600 border border-dashed text-pink-600 focus:outline-none focus:ring-2 focus:ring-[#E1306C] focus:ring-opacity-50"
                            >
                              {button.title}
                            </a>
                          ))}
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
                </div>
              </div>
            )}
            <div>
              <p className="mb-2">Add content for your message</p>
              <div
                className="border-2 border-dashed border-gray-300 rounded-xl text-center cursor-pointer hover:bg-pink-50 hover:border-pink-400 transition-all duration-300 group"
                onClick={() => setOpenMessageModal(true)}
              >
                {nodesData?.instagramCardMessage ||
                nodesData?.instagramTextBtnMessage ? (
                  <div className="w-full ">
                    {(automationId && nodesData?.instagramCardMessage) ||
                    preview ? (
                      <div className="p-2">
                        <img
                          src={
                            nodesData?.instagramCardMessage?.imageUrl
                              ? IMAGE_BASE_URL +
                                nodesData.instagramCardMessage.imageUrl
                              : preview
                          }
                          alt="Uploaded preview"
                          className="max-w-full h-auto max-h-64 object-contain rounded"
                        />
                      </div>
                    ) : null}

                    <div className="p-4 w-full text-left">
                      <span className="font-medium text-gray-800 block mb-3">
                        {nodesData?.['instagramCardMessage']?.title ||
                          nodesData?.['instagramTextBtnMessage']?.text}
                      </span>
                      <span className="font-medium text-gray-800 block mb-3">
                        {nodesData?.instagramCardMessage?.subTitle}
                      </span>
                    </div>

                    {/* <div className="p-4 w-full text-left">{messages}</div> */}
                    {(
                      nodesData?.['instagramCardMessage']?.buttons ||
                      nodesData?.['instagramTextBtnMessage']?.buttons
                    )?.map((btn, index) => (
                      <div key={index} className="w-full flex gap-2 p-2">
                        <a href="#" className="w-full">
                          <button className="border-dashed border p-1 border-pink-500 rounded-lg w-full">
                            {btn.title}
                          </button>
                        </a>
                      </div>
                    ))}
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
                      Setup Messages
                    </span>
                  </div>
                )}
              </div>
            </div>
            {openMessageModal && (
              <SetupMessagesModal
                onClose={() => setOpenMessageModal(false)}
                nodesData={nodesData}
                setNodesData={setNodesData}
                setButtons={setButtons}
                buttons={buttons}
                setMessageData={setMessageData}
                messageData={messageData}
                setPreview={setPreview}
                preview={preview}
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
                    ? nodesData?.openingMessage?.text
                    : nodesData?.followingMessage?.text
                }
                buttonData={
                  customMessageIndex === 1
                    ? nodesData?.openingMessage?.buttons?.length
                      ? nodesData?.openingMessage?.buttons
                      : [{ title: 'Send me link' }]
                    : nodesData?.followingMessage?.buttons?.length
                    ? nodesData?.followingMessage?.buttons
                    : [{ title: 'Visit Profile' }, { title: 'I am following' }]
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
                nodesData={nodesData}
                setNodesData={setNodesData}
              />
            )}
          </div>
        ) : (
          <>
            <TriggerList
              items={actions}
              onClick={() => {
                setShowNextForm(true);
                setNodes((prevNodes) => {
                  // Create new action node
                  const actionUpdatedNodes = prevNodes.map((node) => {
                    if (node.type === 'action') {
                      return {
                        ...node,
                        data: {
                          ...node.data,
                          label: 'Send Instagram Message',
                        },
                      };
                    }
                    return node;
                  });

                  return [...actionUpdatedNodes];
                });
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default NextStepComponent;
