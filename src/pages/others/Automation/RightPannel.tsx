import React, { useState, useEffect } from 'react';
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
  faPlus,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { FaPlus } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import CommentRepliesModal from './CommentModal';
import SetupKeywordsModal from './SetupKeywordsModal';
import NextStepComponent from './NextStepComponent';
import DeleteModal from '../../../components/custom/Modals/DeleteModal';

interface Trigger {
  label: string;
  icon: JSX.Element;
  disabled?: boolean;
  comingSoon?: boolean;
}

interface VideoItem {
  id: string;
  media_type: string;
  thumbnail_url?: string;
  media_url?: string;
  caption?: string;
  permalink?: string;
}

interface KeywordType {
  id: string;
  text: string;
  isActive: boolean;
}

interface TriggerComponentProps {
  handleClick: (trigger: { label: string }) => void;
  tempKeywords: KeywordType[];
  setTempKeywords: (keywords: KeywordType[]) => void;
  handleAddNode: () => void;
  handleActionNode: (action: { label: string }) => void;
  setNodes: (nodes: any[]) => void;
  nextNodeStep: boolean;
  setNextNodeStep: (value: boolean) => void;
  nodesData: any[];
  setNodesData: (nodes: any[]) => void;
}

const triggers: Trigger[] = [
  {
    label: 'Post or Reel Comments',
    icon: (
      <FontAwesomeIcon icon={faComments} className="text-xl text-pink-600" />
    ),
  },
  // {
  //   label: 'Story Replies',
  //   icon: (
  //     <FontAwesomeIcon icon={faEnvelope} className="text-xl text-pink-600" />
  //   ),
  // },
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

const TriggerComponent: React.FC<TriggerComponentProps> = ({
  handleClick,
  tempKeywords,
  setTempKeywords,
  handleAddNode,
  handleActionNode,
  setNodes,
  nextNodeStep,
  setNextNodeStep,
  nodesData,
  setNodesData,
  title,
  setTitle,
  preview,
  setPreview,
  subtitle,
  setSubtitle,
  buttons,
  setButtons,
  selectedTrigger,
  setSelectedTrigger,
  showNextStepInputs,
  setShowNextStepInputs,
}) => {
  const [modalContent, setModalContent] = useState<'post' | 'keywords' | null>(
    null,
  );
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [selectedKeywords, setSelectedKeywords] = useState<KeywordType[]>([]);
  const [showCommentRepliesModal, setShowCommentRepliesModal] = useState(false);
  const [availableReplies, setAvailableReplies] = useState<string[]>([]);
  const [postData, setPostData] = useState<VideoItem[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const token = useSelector((state: any) => state.user.userData.token);

  useEffect(() => {
    // const token =
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbnN0YVVzZXJJZCI6IjE3ODQxNDcyNjkzMDc5NjAxIiwiaWF0IjoxNzQ2NTI2MDE1LCJleHAiOjE3NDcxMzA4MTV9.Z3ZdY4gVF4v3u1MAIsKqT1lTxgregWgTcZZkZYCge58';
    if (modalContent === 'post') {
      fetch('https://instautomate.it-waves.com/service/instagram/media', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setPostData(data.data));
    }
  }, [modalContent, token]);

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
    setNextNodeStep(false);
    setShowNextStepInputs(false);
  };

  const handleTriggerClick = (label: string, disabled?: boolean) => {
    if (!disabled) {
      setSelectedTrigger(label);
      if (nextNodeStep) {
        handleActionNode({
          label,
        });
        setShowNextStepInputs(true);
      } else {
        handleClick({ label });
      }
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

  const handleVideoSelect = (video: VideoItem) => {
    setNodesData({
      ...nodesData,
      trigger: {
        ...nodesData.trigger,
        caption: video.caption,
        contentIds: [video?.id],
        mediaLink: [
          video?.media_type === 'VIDEO'
            ? video?.thumbnail_url
            : video?.media_url,
        ],
        contentThumbnail: video.thumbnail_url
          ? [video.thumbnail_url]
          : [video?.media_url],
      },
    });

    setSelectedVideo(video);
  };

  return (
    <div className="w-[340px] fixed top-[72px] right-0 bg-white overflow-y-auto h-screen">
      <div className="p-6 h-full">
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
            <TriggerList
              items={nextNodeStep ? actions : triggers}
              onClick={handleTriggerClick}
            />
          </>
        ) : !showNextStepInputs ? (
          <TriggerConfig
            selectedTrigger={selectedTrigger}
            selectedVideo={selectedVideo}
            selectedKeywords={selectedKeywords}
            availableReplies={availableReplies}
            setModalContent={setModalContent}
            setShowCommentRepliesModal={setShowCommentRepliesModal}
            handleBack={handleBack}
            handleAddNode={handleAddNode}
            setNextNodeStep={setNextNodeStep}
            removeKeyword={(id) =>
              setSelectedKeywords(selectedKeywords.filter((kw) => kw.id !== id))
            }
          />
        ) : (
          <NextStepComponent
            handleBack={() => {
              setSelectedTrigger(null);
              setSelectedVideo(null);
              setSelectedKeywords([]);
              setAvailableReplies([]);
            }}
            setNextNodeStep={setNextNodeStep}
            setShowNextStepInputs={setShowNextStepInputs}
            nodesData={nodesData}
            nextNodestep={nextNodeStep}
            setNodesData={setNodesData}
            title={title}
            subtitle={subtitle}
            setSubtitle={setSubtitle}
            preview={preview}
            setPreview={setPreview}
            setTitle={setTitle}
            buttons={buttons}
            setButtons={setButtons}
            setNodes={setNodes}
            showNextStepInputs={showNextStepInputs}
          />
        )}

        {showCommentRepliesModal && (
          <CommentRepliesModal
            onClose={() => setShowCommentRepliesModal(false)}
            replies={availableReplies}
            setReplies={setAvailableReplies}
            nodesData={nodesData}
            setNodesData={setNodesData}
          />
        )}

        {modalContent && (
          <PostSelectorModal
            isOpen={modalContent === 'post'}
            postData={postData}
            selectedVideo={selectedVideo}
            onClose={() => setModalContent(null)}
            onSelect={handleVideoSelect}
            onConfirm={() => selectedVideo && setModalContent(null)}
          />
        )}

        {modalContent === 'keywords' && (
          <SetupKeywordsModal
            tempKeywords={tempKeywords}
            closeModal={() => setModalContent(null)}
            setTempKeywords={setTempKeywords}
            setSelectedKeywords={setSelectedKeywords}
            selectedKeywords={selectedKeywords}
            nodesData={nodesData}
            setNodesData={setNodesData}
          />
        )}
      </div>
    </div>
  );
};

export default TriggerComponent;

interface TriggerListProps {
  items: Trigger[];
  onClick: (label: string, disabled?: boolean) => void;
}

const TriggerList: React.FC<TriggerListProps> = ({ items, onClick }) => (
  <div className="space-y-4">
    {items.map((trigger, index) => (
      <div
        key={index}
        onClick={() => onClick(trigger.label, trigger.disabled)}
        className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
          trigger.disabled
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white border border-gray-200 hover:bg-pink-50 hover:border-pink-300 cursor-pointer shadow-md hover:shadow-lg transform hover:-translate-y-1'
        }`}
      >
        <div className="flex items-center space-x-4">
          <div
            className={`p-3 rounded-lg ${
              trigger.disabled ? 'bg-gray-200' : 'bg-pink-100 text-pink-600'
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
);

interface TriggerConfigProps {
  selectedTrigger: string | null;
  selectedVideo: VideoItem | null;
  selectedKeywords: KeywordType[];
  availableReplies: string[];
  setModalContent: (content: 'post' | 'keywords' | null) => void;
  setShowCommentRepliesModal: (value: boolean) => void;
  handleBack: () => void;
  handleAddNode: () => void;
  setNextNodeStep: (value: boolean) => void;
  removeKeyword: (id: string) => void;
}

const TriggerConfig: React.FC<TriggerConfigProps> = ({
  selectedTrigger,
  selectedVideo,
  selectedKeywords,
  availableReplies,
  setModalContent,
  setShowCommentRepliesModal,
  handleBack,
  handleAddNode,
  setNextNodeStep,
  removeKeyword,
}) => (
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
          <h2 className="text-md font-bold text-gray-900">{selectedTrigger}</h2>
          <p className="text-sm text-gray-500 mt-1">
            Configure your trigger settings
          </p>
        </div>
      </div>
    </div>
    <div className="space-y-8 pb-40">
      <div>
        <h3 className="text-base font-semibold text-gray-800 mb-4">Inputs</h3>
        <p className="text-pink-600 mb-2 text-sm">Step 1</p>
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
                    onError={(e) =>
                      (e.currentTarget.src = '/fallback-image.jpg')
                    }
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
        <p className="text-pink-600 mb-2 text-sm">Step 2</p>

        <p className="mb-2 text-sm text-gray-600">
          What keywords will start your automation?
        </p>
        <div
          className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center cursor-pointer hover:bg-pink-50 hover:border-pink-400 transition-all duration-300 group"
          onClick={() => setModalContent('keywords')}
        >
          {selectedKeywords.length > 0 ? (
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
                    <FontAwesomeIcon icon={faTimes} className="h-3 w-3" />
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
              <span className="font-medium text-pink-600">Setup Keywords</span>
              <p className="text-xs text-gray-500 mt-1">
                Add trigger words or phrases
              </p>
            </>
          )}
        </div>
      </div>
      <div>
        <p className="text-pink-600 mb-2 text-sm">Step 3</p>

        <p className="mb-2 text-sm text-gray-600">
          What do you want to reply to those comments?
        </p>
        <div
          className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center cursor-pointer hover:bg-pink-50 hover:border-pink-400 transition-all duration-300 group"
          onClick={() => setShowCommentRepliesModal(true)}
        >
          {availableReplies.length > 0 ? (
            <div className="flex items-center justify-between">
              <span className="text-pink-600 font-medium">
                {availableReplies.length}{' '}
                {availableReplies.length === 1 ? 'Reply' : 'Replies'} Added
              </span>
              <FontAwesomeIcon icon={faComment} className="text-gray-400" />
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
      <NextStepButton
        onClick={() => {
          handleAddNode();
          setNextNodeStep(true);
        }}
      />
    </div>
  </>
);

interface PostSelectorModalProps {
  isOpen: boolean;
  postData: VideoItem[];
  selectedVideo: VideoItem | null;
  onClose: () => void;
  onSelect: (video: VideoItem) => void;
  onConfirm: () => void;
}

const PostSelectorModal: React.FC<PostSelectorModalProps> = ({
  isOpen,
  postData,
  selectedVideo,
  onClose,
  onSelect,
  onConfirm,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-9999 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-2xl w-[600px]  h-[550px] shadow-2xl animate-fade-in">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-bold text-gray-900">
            Select Post or Reel
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-pink-700 transition-colors duration-200"
          >
            <FontAwesomeIcon icon={faTimes} className="h-5 w-5" />
          </button>
        </div>
        <p className="text-sm text-gray-600 mb-6">
          Choose a post or reel from your connected account.
        </p>
        <div className="flex flex-wrap gap-4 mb-6 overflow-y-auto h-[350px] ">
          {/* <div className="p-3 w-40 h-40 flex flex-col rounded-xl border border-pink-200 bg-gradient-to-br from-pink-50 to-pink-300 shadow-md cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:bg-pink-50">
            <div className="relative w-full aspect-square rounded-md overflow-hidden flex items-center justify-center">
              <div className="text-pink-600">
                <FaPlus className="w-12 h-12" />
              </div>
            </div>
            <div className="mt-2 flex items-center justify-center">
              <h4 className="text-xs font-semibold text-gray-900 text-center">
                Add New Media
              </h4>
            </div>
          </div> */}
          {postData?.map((post) => (
            <div
              key={post.id}
              onClick={() => onSelect(post)}
              className={`p-3 w-40 h-40 flex flex-col rounded-xl border border-pink-200 bg-white shadow-md cursor-pointer transition-all duration-200 ${
                selectedVideo?.id === post.id
                  ? 'border-2 border-pink-600 bg-pink-50'
                  : 'hover:-translate-y-1 hover:shadow-lg hover:bg-pink-50'
              }`}
            >
              <div className="relative w-full aspect-square bg-pink-50 rounded-md overflow-hidden">
                <img
                  src={
                    post.media_type === 'VIDEO'
                      ? post?.thumbnail_url
                      : post?.media_url
                  }
                  alt={post.caption}
                  className="w-full h-full object-cover"
                  onError={(e) => (e.currentTarget.src = '/fallback-image.jpg')}
                />
                {post?.media_type === 'VIDEO' && (
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
              <div className="mt-2 flex items-start justify-between">
                <h4 className="text-xs font-semibold text-gray-900 line-clamp-2 flex-1">
                  {post.caption}
                </h4>
                {selectedVideo?.id === post.id && (
                  <div className="ml-2 w-4 h-4 rounded-full bg-pink-600 text-white flex items-center justify-center flex-shrink-0">
                    <FontAwesomeIcon icon={faCheck} className="h-2 w-2" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
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
    </div>
  );
};

interface NextStepButtonProps {
  onClick: () => void;
}

const NextStepButton: React.FC<NextStepButtonProps> = ({ onClick }) => (
  <div
    className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-sm border border-pink-200"
    onClick={onClick}
  >
    <div className="mb-4">
      <h2 className="text-lg font-medium text-pink-800">Next Step</h2>
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
);
