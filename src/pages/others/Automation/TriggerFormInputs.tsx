import { useEffect, useState } from 'react';
import { TriggerListProps, VideoItem } from '../../../types/triggerForm';
import { triggers } from './settings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faComment,
  faImage,
  faKey,
  faPlus,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import PostSelectorModal from './PostSelectorModal';
import SetupKeywordsModal from './SetupKeywordsModal';
import CommentRepliesModal from './CommentModal';
import { getApi } from '../../../services/commonServices';

interface TriggerItem {
  label: string;
  icon: React.ReactNode;
  disabled?: boolean;
  comingSoon?: boolean;
  type: string;
}

interface TriggerListProps {
  items: TriggerItem[];
  onClick?: (label: string) => void;
}

const TriggerList: React.FC<TriggerListProps> = ({ items, onClick }) => {
  return (
    <div className="space-y-4">
      {items.map((trigger, index) => (
        <div
          key={`${trigger.label}-${index}`}
          onClick={() => {
            onClick(trigger.type);
          }}
          className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
            trigger.disabled
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white border border-gray-200 hover:bg-pink-50 hover:border-pink-300 cursor-pointer shadow-md hover:shadow-lg transform hover:-translate-y-1'
          }`}
          aria-disabled={trigger.disabled}
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
};

const TriggerConfig: React.FC<TriggerConfigProps> = ({
  setShowNextNode,
  clickToAddNode,
  setModalType,
  triggerType,
  setIsLike,
  islike,
  nodesData,
}) => (
  <>
    <div className="flex items-center justify-between mb-6"></div>
    <div className="space-y-8 pb-40">
      <div>
        <h3 className="text-base font-semibold text-gray-800 mb-4">Inputs</h3>
        <p className="text-pink-600 mb-2 text-sm">Step 1</p>
        <p className="mb-2 text-sm text-gray-600">
          {triggerType === 'INSTAGRAM_STORY_REPLIES'
            ? 'Which Story do you want to use?'
            : 'Which Post or Reel do you want to use?'}
        </p>
        <div
          className="border-2 border-dashed border-gray-300 rounded-xl text-center cursor-pointer hover:bg-pink-50 hover:border-pink-400 transition-all duration-300 group"
          onClick={() => setModalType('post')}
        >
          {nodesData?.mediaLink ? (
            <div className="w-[300px] rounded-xl p-4">
              <div className="flex gap-2">
                {/* Image wrapper width updated */}
                <div className="w-20 h-20 bg-gray-200 rounded-md overflow-hidden shadow-sm flex-shrink-0">
                  <img
                    src={nodesData?.mediaLink}
                    alt={nodesData?.caption}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Text container given a max width and truncation behavior */}
                <div className="text-left flex-1 overflow-hidden">
                  <h4 className="text-sm font-medium text-gray-900 truncate w-[100px]">
                    {nodesData?.caption}
                  </h4>
                  <p className="text-xs text-gray-500">
                    Selected{' '}
                    {triggerType === 'INSTAGRAM_STORY_REPLIES'
                      ? 'Story'
                      : 'Post'}
                  </p>
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
                {triggerType === 'INSTAGRAM_STORY_REPLIES'
                  ? 'Select Story'
                  : 'Select Post or Reel'}
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
          onClick={() => setModalType('keywords')}
        >
          {nodesData?.includeKeywords?.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {nodesData?.includeKeywords?.map((keyword, index) => (
                <div
                  key={index}
                  className="inline-flex items-center bg-pink-100 rounded-full px-3 py-1 text-sm"
                >
                  {keyword}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // removeKeyword(keyword.id);
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
      {triggerType === 'INSTAGRAM_POST_REEL' ? (
        <div>
          <p className="text-pink-600 mb-2 text-sm">Step 3</p>

          <p className="mb-2 text-sm text-gray-600">
            What do you want to reply to those comments?
          </p>
          <div
            className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center cursor-pointer hover:bg-pink-50 hover:border-pink-400 transition-all duration-300 group"
            onClick={() => setModalType('replies')}
          >
            {nodesData?.commentReplies?.length > 0 ? (
              <div className="flex items-center justify-between">
                <span className="text-pink-600 font-medium">
                  {nodesData?.commentReplies?.length}{' '}
                  {nodesData?.commentReplies?.length === 1
                    ? 'Reply'
                    : 'Replies'}{' '}
                  Added
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
      ) : (
        <div className="flex justify-between items-center mb-4">
          <p>Do you want to react with ❤️</p>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={nodesData?.likeComment}
              onChange={() => setIsLike(!islike)}
            />
            <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-gradient-to-r peer-checked:from-pink-500 peer-checked:to-purple-500 transition-all duration-300" />
            <div className="absolute left-1 bg-white w-4 h-4 rounded-full shadow-sm transition-transform duration-300 peer-checked:translate-x-5" />
          </label>
        </div>
      )}
      <div
        className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-sm border border-pink-200"
        // onClick={() => {}}
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
          <button
            onClick={() => {
              setShowNextNode(true);
              clickToAddNode();
            }}
            className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-500 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Select Block
          </button>
        </div>
      </div>
    </div>
  </>
);

function TriggerFormInputs({
  setNodesData,
  nodesData,
  selectedTrigger,
  setSelectedTrigger,
  setNodes,
  setShowNextNode,
  handleAddNode,
  setTriggerType,
  triggerType,
  setPublishData,
  showTriggerNode,
}) {
  const [modalType, setModalType] = useState<string>('');
  const [postData, setPostData] = useState<any>([]);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [selectedKeywords, setSelectedKeywords] = useState<any>([]);
  const [tempKeywords, setTempKeywords] = useState<any>([]);
  const [replies, setReplies] = useState<any>([]);
  const [islike, setIsLike] = useState(false);

  useEffect(() => {
    if (modalType === 'post') {
      getApi(
        triggerType === 'INSTAGRAM_POST_REEL'
          ? '/service/instagram/media'
          : '/service/instagram/stories',
      ).then((res) => setPostData(res.data));
    }

    if (tempKeywords?.length) {
      setNodes((prevNodes) =>
        prevNodes.map((node) =>
          node.type === 'trigger'
            ? {
                ...node,
                data: {
                  ...node.data,
                },
              }
            : node,
        ),
      );
    }
    setNodesData({
      ...nodesData,
      trigger: {
        ...nodesData.trigger,
        likeComment: islike,
      },
    });
  }, [modalType, tempKeywords, islike]);

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
    <div className="w-[400px]   right-0 bg-white overflow-y-auto h-screen">
      <div className="p-6 h-full">
        {!selectedTrigger ? (
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Select a Trigger
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                Choose an event to start your automation
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSelectedTrigger(false)}
              className="p-2 w-10 h-10 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-600 transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="h-5 w-5" />
            </button>
            <div>
              <h2 className="text-md font-bold text-gray-900">
                {triggerType === 'INSTAGRAM_POST_REEL'
                  ? ' Post or Reel Comments'
                  : ' Story Replies'}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Configure your trigger settings
              </p>
            </div>
          </div>
        )}

        {selectedTrigger ? (
          <TriggerConfig
            setModalType={setModalType}
            selectedVideo={selectedVideo}
            selectedKeywords={selectedKeywords}
            availableReplies={replies}
            setShowNextNode={setShowNextNode}
            clickToAddNode={handleAddNode}
            triggerType={triggerType}
            setIsLike={setIsLike}
            islike={islike}
            nodesData={nodesData.trigger}
            setPublishData={setPublishData}
          />
        ) : (
          <TriggerList
            items={triggers}
            onClick={(type) => {
              setSelectedTrigger(true);
              setTriggerType(type);
              showTriggerNode();
            }}
          />
        )}
      </div>
      {modalType === 'post' && (
        <PostSelectorModal
          postData={
            triggerType === 'INSTAGRAM_POST_REEL' ? postData : postData.data
          }
          selectedVideo={selectedVideo}
          onClose={() => setModalType('')}
          onSelect={handleVideoSelect}
          onConfirm={() => {
            setModalType('');
          }}
          triggerType={triggerType}
        />
      )}

      {modalType === 'keywords' && (
        <SetupKeywordsModal
          tempKeywords={tempKeywords}
          closeModal={() => setModalType('')}
          setTempKeywords={setTempKeywords}
          setSelectedKeywords={setSelectedKeywords}
          selectedKeywords={selectedKeywords}
          nodesData={nodesData}
          setNodesData={setNodesData}
        />
      )}

      {modalType === 'replies' && (
        <CommentRepliesModal
          onClose={() => setModalType('')}
          replies={replies}
          setReplies={setReplies}
          nodesData={nodesData}
          setNodesData={setNodesData}
        />
      )}
    </div>
  );
}

export default TriggerFormInputs;
