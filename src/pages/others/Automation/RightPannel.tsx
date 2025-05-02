import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComments,
  faEnvelope,
  faVideo,
  faImage,
  faKey,
  faTimes,
  faCheck,
  faArrowLeft,
  faComment,
  faPlay,
  faCommentDots,
  faPlus,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import vdo from '../../../images/user/user-08.png';
import CommentRepliesModal from './CommentModal';
import { FaPlus } from 'react-icons/fa';
import SetupKeywordsModal from './SetupKeywordsModal';
import NextStepComponent from './NextStepComponent';
import DeleteModal from '../../../components/custom/Modals/DeleteModal';
import { useReactFlow } from 'reactflow';
import { useDispatch, useSelector } from 'react-redux';
import { setAutomationData } from '../../../store/slices/userSlice';

type Trigger = {
  label: string;
  icon: JSX.Element;
  disabled?: boolean;
  comingSoon?: boolean;
};

const triggers: Trigger[] = [
  {
    label: 'Post or Reel Comments',
    icon: (
      <FontAwesomeIcon icon={faComments} className="text-xl text-pink-600" />
    ),
  },
  {
    label: 'Story Replies',
    icon: (
      <FontAwesomeIcon icon={faEnvelope} className="text-xl text-pink-600" />
    ),
  },
  {
    label: 'Live Comments',
    icon: <FontAwesomeIcon icon={faVideo} className="text-xl text-gray-400" />,
    disabled: true,
    comingSoon: true,
  },
];
const actions: Trigger[] = [
  {
    label: 'Send Instagram Message',
    icon: (
      <FontAwesomeIcon icon={faComments} className="text-xl text-pink-600" />
    ),
  },

  {
    label: 'Collect User Emails',
    icon: <FontAwesomeIcon icon={faVideo} className="text-xl text-gray-400" />,
    disabled: true,
    comingSoon: true,
  },
];
type KeywordType = {
  id: string;
  text: string;
  isActive: boolean;
};

const TriggerComponent: React.FC<{
  handleClick: (trigger: { label: string }) => void;
}> = ({
  handleClick,
  tempKeywords,
  setTempKeywords,
  handleAddNode,
  handleActionNode,
  setNodes,
  nextNodeStep,
  setNextNodeStep,
  nodes,
}) => {
  const [selectedTrigger, setSelectedTrigger] = useState<string | null>(null);
  const [modalContent, setModalContent] = useState<'post' | 'keywords' | null>(
    null,
  );
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedKeywords, setSelectedKeywords] = useState<KeywordType[]>([]);
  const [showCommentRepliesModal, setShowCommentRepliesModal] = useState(false);
  const [availableReplies, setAvailableReplies] = useState<string[]>([]);
  const [postData, setPostData] = useState<string[]>([]);
  const [showNextStepInputs, setShowNextStepInputs] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const token = useSelector((state: any) => state.user.userData.token);
  const nodesData = useSelector((state: any) => state.user.userData.nodes);
  const dispatch = useDispatch();
  console.log({ nodesData });

  const confirmDelete = () => {
    setNodes((prevNodes) => {
      // Debugging: Log current nodes before filtering
      console.log('Current nodes:', prevNodes);

      // Filter out action nodes
      const filteredNodes = prevNodes.filter((node) => {
        const shouldKeep = node.type !== 'action';
        console.log(
          `Node ${node.id} type: ${node.type} - ${
            shouldKeep ? 'keeping' : 'removing'
          }`,
        );
        return shouldKeep;
      });

      console.log('Nodes after filter:', filteredNodes);

      // Update trigger nodes
      const updatedNodes = filteredNodes.map((node) => {
        if (node.type === 'trigger') {
          console.log(`Updating trigger node ${node.id}`);
          return {
            ...node,
            data: {
              ...node.data,
              isFirstTrigger: true,
            },
          };
        }
        return node;
      });

      console.log('Final nodes:', updatedNodes);
      return updatedNodes;
    });

    // Reset other states
    setIsDeleteModalOpen(false);
    setNextNodeStep(false);
    setShowNextStepInputs(false);
  };

  const handleTriggerClick = (label: string, disabled?: boolean) => {
    if (!disabled) {
      setSelectedTrigger(label);
    }
  };

  const closeModal = () => {
    setModalContent(null);
  };

  const handleVideoSelect = (video: VideoItem) => {
    console.log(video);

    const data = {
      data: {
        ...nodesData[0].data,
        content_id: [video.id], //post id
        content_thumbnail: [
          video.media_type === 'VIDEO' ? video.thumbnail_url : video.media_url, //post url
        ],
        permalink: [video.permalink], //post url
      },
      id: 'trigger',
      position: { x: -135, y: -195 },
      type: 'trigger',
    };

    let updatedNodes = [...nodesData];
    updatedNodes[0] = data;

    dispatch(setAutomationData(updatedNodes));
    setSelectedVideo(video);
  };

  const handleConfirm = () => {
    if (selectedVideo) {
      closeModal();
    }
  };

  const handleBack = () => {
    setSelectedTrigger(null);
    setSelectedVideo(null);
    setSelectedKeywords([]);
    setAvailableReplies([]);
    setNodes([
      {
        id: '1',
        type: 'default',
        position: { x: 200, y: 200 },
        data: { label: 'Set a trigger in the sidebar', isConfigured: false },
        style: {
          background: '#ffffff',
          border: '2px solid #E1306C',
          borderRadius: '12px',
          color: '#E1306C',
          fontWeight: '600',
          fontSize: '14px',
          boxShadow: '0 4px 6px rgba(225, 48, 108, 0.2)',
          width: '280px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        },
      },
    ]);
  };

  const handleMessageBack = () => {
    setSelectedTrigger(null);
    setSelectedVideo(null);
    setSelectedKeywords([]);
    setAvailableReplies([]);
  };

  useEffect(() => {
    console.log({ token });
    async function fetchPosts() {
      fetch('https://instautomate.it-waves.com/service/instagram/media', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setPostData(data.data);
        });
    }
    modalContent === 'post' && fetchPosts();
  }, [modalContent]);

  const removeKeyword = (id: string) => {
    setSelectedKeywords(selectedKeywords.filter((kw) => kw.id !== id));
  };
  return (
    <div className="w-[360px] fixed top-[70px] right-0  bg-white overflow-y-auto h-screen ">
      <div className="p-6 h-full ">
        {!selectedTrigger || (nextNodeStep && !showNextStepInputs) ? (
          <>
            <div className="mb-8 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  {nextNodeStep ? 'Next Step' : 'Select a Trigger'}
                </h2>
                <p className="text-sm text-gray-500 mt-2">
                  {nextNodeStep
                    ? 'Set the next block in the workflow'
                    : 'Choose an event to start your automation'}
                </p>
              </div>
              {nextNodeStep && (
                <FontAwesomeIcon
                  icon={faTrashCan}
                  className="text-pink-600 cursor-pointer"
                  onClick={() => setIsDeleteModalOpen(true)}
                />
              )}
            </div>
            <DeleteModal
              isOpen={isDeleteModalOpen}
              onClose={() => setIsDeleteModalOpen(false)}
              onConfirm={confirmDelete}
              title="Delete Node?"
              description="Are you sure you want to delete this node?"
            />

            <div className="space-y-4">
              {(nextNodeStep ? actions : triggers).map((trigger, index) => (
                <div
                  key={index}
                  onClick={() => {
                    handleTriggerClick(trigger.label, trigger.disabled);
                    if (nextNodeStep) {
                      handleActionNode({ label: trigger.label });
                      setShowNextStepInputs(true);
                    } else {
                      handleClick({ label: trigger.label });
                    }
                  }}
                  className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
                    trigger.disabled
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white border border-gray-200 hover:bg-pink-50 hover:border-pink-300 cursor-pointer shadow-md hover:shadow-lg transform hover:-translate-y-1'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`p-3 rounded-lg ${
                        trigger.disabled
                          ? 'bg-gray-200'
                          : 'bg-pink-100 text-pink-600'
                      } transition-colors duration-200`}
                    >
                      {trigger.icon}
                    </div>
                    <span className="text-sm font-semibold text-gray-800">
                      {trigger.label}
                    </span>
                  </div>
                  {trigger.comingSoon && (
                    <span className="text-xs px-3 py-1 rounded-full bg-purple-100 text-purple-700 font-medium animate-pulse">
                      Coming Soon
                    </span>
                  )}
                </div>
              ))}
            </div>
          </>
        ) : !showNextStepInputs ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleBack}
                  className="p-2 w-10 h-10 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-600 transition-colors duration-200"
                >
                  <FontAwesomeIcon icon={faArrowLeft} className="h-5 w-5" />
                </button>
                <div>
                  <h2 className="text-md font-bold text-gray-900">
                    {selectedTrigger}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Configure your trigger settings
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-8 pb-40 ">
              <div>
                <h3 className="text-base font-semibold text-gray-800 mb-4">
                  Inputs
                </h3>
                <p className="mb-2 text-sm text-gray-600">
                  Which Post or Reel do you want to use?
                </p>
                <div
                  className="border-2 border-dashed border-gray-300 rounded-xl text-center cursor-pointer hover:bg-pink-50 hover:border-pink-400 transition-all duration-300 group"
                  onClick={() => setModalContent('post')}
                >
                  {selectedVideo ? (
                    <div className="w-[300px] rounded-xl p-4">
                      <div className="flex gap-2">
                        <div className="w-[500px] h-20 bg-gray-200 rounded-md overflow-hidden shadow-sm">
                          <img
                            src={
                              selectedVideo.media_type === 'VIDEO'
                                ? selectedVideo.thumbnail_url
                                : selectedVideo.media_url
                            }
                            alt={selectedVideo.caption}
                            className="w-20 h-20 object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                '/fallback-image.jpg';
                            }}
                          />
                        </div>
                        <div className="text-left">
                          <h4 className="text-sm font-medium w-[180px] text-gray-900 line-clamp-1">
                            {selectedVideo.caption}
                          </h4>
                          <p className="text-xs text-gray-500">Selected Post</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4">
                      <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-pink-200 transition-colors duration-200">
                        <FontAwesomeIcon
                          icon={faImage}
                          className="text-xl text-pink-600"
                        />
                      </div>
                      <span className="font-medium text-pink-600">
                        Select Post or Reel
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm text-gray-600">
                  What keywords will start your automation?
                </p>
                <div
                  className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center cursor-pointer hover:bg-pink-50 hover:border-pink-400 transition-all duration-300 group"
                  onClick={() => setModalContent('keywords')}
                >
                  {selectedKeywords?.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {selectedKeywords.map((keyword) => (
                        <div
                          key={keyword.id}
                          className="inline-flex items-center bg-pink-100 rounded-full px-3 py-1 text-sm"
                        >
                          {keyword.text}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeKeyword(keyword.id);
                            }}
                            className="ml-2 text-gray-500 hover:text-red-500"
                          >
                            <FontAwesomeIcon
                              icon={faTimes}
                              className="h-3 w-3"
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <>
                      <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-pink-200 transition-colors duration-200">
                        <FontAwesomeIcon
                          icon={faKey}
                          className="text-xl text-pink-600"
                        />
                      </div>
                      <span className="font-medium text-pink-600">
                        Setup Keywords
                      </span>
                      <p className="text-xs text-gray-500 mt-1">
                        Add trigger words or phrases
                      </p>
                    </>
                  )}
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm text-gray-600">
                  What do you want to reply to those comments?
                </p>
                <div
                  className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center cursor-pointer hover:bg-pink-50 hover:border-pink-400 transition-all duration-300 group"
                  onClick={() => setShowCommentRepliesModal(true)}
                >
                  {availableReplies?.length > 0 ? (
                    <div className="flex items-center justify-between">
                      <span className="text-pink-600 font-medium">
                        {availableReplies?.length}{' '}
                        {availableReplies?.length === 1 ? 'Reply' : 'Replies'}{' '}
                        Added
                      </span>
                      <FontAwesomeIcon
                        icon={faComment}
                        className="text-gray-400"
                      />
                    </div>
                  ) : (
                    <>
                      <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-pink-200 transition-colors duration-200">
                        <FontAwesomeIcon
                          icon={faComment}
                          className="text-xl text-pink-600"
                        />
                      </div>
                      <span className="font-medium text-pink-600">
                        Setup Comment Replies
                      </span>
                    </>
                  )}
                </div>
              </div>
              <div
                className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-sm border border-pink-200"
                onClick={() => {
                  handleAddNode();
                  setNextNodeStep(true);
                }}
              >
                <div className="mb-4">
                  <h2 className="text-lg font-medium text-pink-800">
                    Next Step
                  </h2>
                  <p className="text-sm text-pink-600 mt-1">
                    Add the next block in this automation
                  </p>
                </div>

                <div className="border border-dashed border-pink-400 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-pink-700 mb-2">
                    Post or Reel Comments
                  </h3>

                  <button className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-500 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400">
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    Select Block
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <NextStepComponent
            handleBack={handleMessageBack}
            setNextNodeStep={setNextNodeStep}
            setShowNextStepInputs={setShowNextStepInputs}
          />
        )}

        {showCommentRepliesModal && (
          <CommentRepliesModal
            onClose={() => setShowCommentRepliesModal(false)}
            replies={availableReplies}
            setReplies={setAvailableReplies}
            nodesData={nodesData}
          />
        )}

        {modalContent && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-9999 backdrop-blur-sm">
            {modalContent === 'post' && (
              <div className="bg-white p-8 rounded-2xl w-[600px] max-h-[80vh] overflow-y-auto shadow-2xl animate-fade-in">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    Select Post or Reel
                  </h3>
                  <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-pink-700 transition-colors duration-200"
                  >
                    <FontAwesomeIcon icon={faTimes} className="h-5 w-5" />
                  </button>
                </div>
                <p className="text-sm text-gray-600 mb-6">
                  Choose a post or reel from your connected account.
                </p>

                <div className="flex flex-wrap gap-4 mb-6">
                  {/* Extra Div for Add New Media */}
                  <div
                    onClick={() => onAddNewMedia?.()}
                    className="p-3 w-40 h-40 flex flex-col rounded-xl border border-pink-200 bg-gradient-to-br from-pink-50 to-pink-300 shadow-md cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:bg-pink-50"
                  >
                    <div className="relative w-full aspect-square  rounded-md overflow-hidden flex items-center justify-center">
                      <div className="text-pink-600">
                        <FaPlus className="w-12 h-12" />
                      </div>
                    </div>
                    <div className="mt-2 flex items-center justify-center">
                      <h4 className="text-xs font-semibold text-gray-900 text-center">
                        Add New Media
                      </h4>
                    </div>
                  </div>

                  {/* Existing Post Data Items */}
                  {postData?.map((post) => (
                    <div
                      key={post?.id}
                      onClick={() => handleVideoSelect(post)}
                      className={`p-3 w-40 h-40 flex flex-col rounded-xl border border-pink-200 bg-white shadow-md cursor-pointer transition-all duration-200 ${
                        selectedVideo?.id === post.id
                          ? 'border-2 border-pink-600 bg-pink-50'
                          : 'hover:-translate-y-1 hover:shadow-lg hover:bg-pink-50'
                      }`}
                    >
                      {/* Square media container */}
                      <div className="relative w-full aspect-square bg-pink-50 rounded-md overflow-hidden">
                        <img
                          src={
                            post.media_type === 'VIDEO'
                              ? post.thumbnail_url
                              : post.media_url
                          }
                          alt={post.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              '/fallback-image.jpg';
                          }}
                        />

                        {/* Play icon for videos */}
                        {post.media_type === 'VIDEO' && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-10 h-10 bg-pink-600 bg-opacity-70 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110">
                              <FontAwesomeIcon
                                icon={faPlay}
                                className="text-white text-lg ml-1"
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Title and selection indicator */}
                      <div className="mt-2 flex items-start justify-between">
                        <h4 className="text-xs font-semibold text-gray-900 line-clamp-2 flex-1">
                          {post.title}
                        </h4>
                        {selectedVideo?.id === post.id && (
                          <div className="ml-2 w-4 h-4 rounded-full bg-pink-600 text-white flex items-center justify-center flex-shrink-0">
                            <FontAwesomeIcon
                              icon={faCheck}
                              className="h-2 w-2"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirm}
                    disabled={!selectedVideo}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      selectedVideo
                        ? 'bg-pink-600 text-white hover:bg-pink-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Confirm Selection
                  </button>
                </div>
              </div>
            )}
            {modalContent === 'keywords' && (
              <SetupKeywordsModal
                tempKeywords={tempKeywords}
                closeModal={closeModal}
                setTempKeywords={setTempKeywords}
                setSelectedKeywords={setSelectedKeywords}
                selectedKeywords={selectedKeywords}
                nodesData={nodesData}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TriggerComponent;
