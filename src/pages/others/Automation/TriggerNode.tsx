import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComments,
  faEnvelope,
  faVideo,
  faImage,
  faKey,
  faTimes,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import vdo from '../../../images/user/user-08.png';
import { faComment } from '@fortawesome/free-solid-svg-icons/faComment';
import CommentRepliesModal from './CommentModal';

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
      <FontAwesomeIcon icon={faComments} className="text-xl text-indigo-600" />
    ),
  },
  {
    label: 'Story Replies',
    icon: (
      <FontAwesomeIcon icon={faEnvelope} className="text-xl text-indigo-600" />
    ),
  },
  {
    label: 'Live Comments',
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

type VideoItem = {
  id: string;
  title: string;
  thumbnail: string;
};

const videos: VideoItem[] = [
  {
    id: '1',
    title: 'Finisher. Leader. Legend. 🟡 #ThalaForAReason',
    thumbnail: vdo,
  },
  {
    id: '2',
    title: 'Next Post or Reel',
    thumbnail: vdo,
  },
];

const TriggerComponent: React.FC<{
  handleClick: (trigger: { label: string }) => void;
}> = ({ handleClick }) => {
  const [selectedTrigger, setSelectedTrigger] = useState<string | null>(null);
  const [modalContent, setModalContent] = useState<'post' | 'keywords' | null>(
    null,
  );
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [keywordInput, setKeywordInput] = useState('');
  const [tempKeywords, setTempKeywords] = useState<KeywordType[]>([]);
  const [selectedKeywords, setSelectedKeywords] = useState<KeywordType[]>([]);
  const [showCommentRepliesModal, setShowCommentRepliesModal] = useState(false);
  const [availableReplies, setAvailableReplies] = useState([
    // { id: '1', text: 'Message sent! 🚀', emoji: '😄' },
    // { id: '2', text: 'Got it, check your inbox! 📬', emoji: '😊' },
    // { id: '3', text: 'And Replyrn 🔔', emoji: '👍' },
  ]);
  const handleKeywordInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setKeywordInput(e.target.value);
  };

  const handleTriggerClick = (label: string, disabled?: boolean) => {
    if (!disabled) {
      setSelectedTrigger(label);
    }
  };

  const handleAddKeyword = () => {
    if (keywordInput.trim()) {
      const newKeywords = keywordInput
        .split(',')
        .map((text, index) => ({
          id: `kw-${Date.now()}-${index}`,
          text: text.trim(),
          isActive: true,
        }))
        .filter((kw) => kw.text.length > 0);

      setTempKeywords((prev) => {
        const updated = [...prev, ...newKeywords];
        console.log('Updated tempKeywords:', updated);
        return updated;
      });
      setKeywordInput('');
    }
  };

  const closeModal = () => {
    setModalContent(null);
  };

  const handleVideoSelect = (video: VideoItem) => {
    setSelectedVideo(video);
  };

  const handleConfirm = () => {
    if (selectedVideo) {
      closeModal();
    }
  };

  const removeTempKeyword = (id: string) => {
    setTempKeywords(tempKeywords.filter((kw) => kw.id !== id));
  };

  const removeKeyword = (id: string) => {
    setSelectedKeywords(selectedKeywords.filter((kw) => kw.id !== id));
  };

  const handleSaveKeywords = () => {
    // Append tempKeywords to selectedKeywords, avoiding duplicates by text
    setSelectedKeywords((prev) => {
      const existingTexts = new Set(prev.map((kw) => kw.text.toLowerCase()));
      const newKeywords = tempKeywords.filter(
        (kw) => !existingTexts.has(kw.text.toLowerCase()),
      );
      const updated = [...prev, ...newKeywords];
      console.log('Updated selectedKeywords:', updated);
      return updated;
    });
    setTempKeywords([]);
    closeModal();
  };

  return (
    <div className="w-[420px] bg-white rounded-2xl shadow-xl overflow-auto font-sans z-10">
      <div className="p-6">
        {!selectedTrigger ? (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Select a Trigger
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Choose an event to initiate this automation
              </p>
            </div>

            <div className="space-y-3">
              {triggers.map((trigger, index) => (
                <div
                  key={index}
                  onClick={() => {
                    handleTriggerClick(trigger.label, trigger.disabled);
                    handleClick({ label: trigger.label });
                  }}
                  className={`flex items-center justify-between p-4 rounded-lg transition-all duration-300
                    ${
                      trigger.disabled
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white border border-gray-200 hover:bg-indigo-50 hover:border-indigo-300 cursor-pointer shadow-sm'
                    }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 rounded-md ${
                        trigger.disabled ? 'bg-gray-200' : 'bg-indigo-100'
                      } transition-colors duration-200`}
                    >
                      {trigger.icon}
                    </div>
                    <span className="text-sm font-medium text-gray-800">
                      {trigger.label}
                    </span>
                  </div>
                  {trigger.comingSoon && (
                    <span className="text-xs px-2.5 py-1 rounded-full bg-purple-100 text-purple-700 font-medium">
                      Coming Soon
                    </span>
                  )}
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-medium text-gray-900">
                  {selectedTrigger}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Configure your trigger settings
                </p>
              </div>
              <button
                onClick={() => setSelectedTrigger(null)}
                className="flex items-center text-sm text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
              >
                <FontAwesomeIcon icon={faTimes} className="h-4 w-4 mr-1" />
                Clear
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-base font-semibold text-gray-800 mb-3">
                  Inputs
                </h3>
                <p className="mb-2 text-sm text-gray-600">
                  Which Post or Reel do you want to use?
                </p>
                <div
                  className="border-2 border-dashed border-gray-300 rounded-xl text-center cursor-pointer hover:bg-indigo-50 hover:border-indigo-400 transition-all duration-300 group"
                  onClick={() => setModalContent('post')}
                >
                  {selectedVideo ? (
                    <div className="w-full rounded-xl p-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-md overflow-hidden">
                          <img
                            src={selectedVideo.thumbnail}
                            alt={selectedVideo.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">
                            {selectedVideo.title}
                          </h4>
                          <p className="text-xs text-gray-500">Selected Post</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4">
                      <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-indigo-200 transition-colors duration-200">
                        <FontAwesomeIcon
                          icon={faImage}
                          className="text-xl text-indigo-600"
                        />
                      </div>
                      <span className="font-medium text-indigo-600">
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
                  className="border-2 border-dashed border-gray-300 rounded-xl p-2 h-30 text-center cursor-pointer hover:bg-indigo-50 hover:border-indigo-400 transition-all duration-300 group"
                  onClick={() => setModalContent('keywords')}
                >
                  {selectedKeywords.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {selectedKeywords.map((keyword) => (
                        <div
                          key={keyword.id}
                          className="inline-flex items-center bg-indigo-100 rounded-full px-3 py-1 text-sm"
                        >
                          {keyword.text}
                          <button
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent opening modal
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
                      <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-indigo-200 transition-colors duration-200">
                        <FontAwesomeIcon
                          icon={faKey}
                          className="text-xl text-indigo-600"
                        />
                      </div>
                      <span className="font-medium text-indigo-600">
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
                <div onClick={() => setShowCommentRepliesModal(true)}>
                  {availableReplies.length > 0 ? (
                    <div className="border-2 border-gray-300 rounded-md border-dashed p-2">
                      {availableReplies.length===1 ? `${availableReplies.length} Reply` : `${availableReplies.length} Replies`}
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-2 h-30 text-center cursor-pointer hover:bg-indigo-50 hover:border-indigo-400 transition-all duration-300 group">
                      <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-indigo-200 transition-colors duration-200">
                        <FontAwesomeIcon
                          icon={faComment}
                          className="text-xl text-indigo-600"
                        />
                      </div>
                      <span className="font-medium text-indigo-600">
                        Setup Comment Replies
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {showCommentRepliesModal && (
          <CommentRepliesModal
            onClose={() => setShowCommentRepliesModal(false)}
            replies={availableReplies}
            setReplies={setAvailableReplies}
          />
        )}

        {modalContent && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-9999 backdrop-blur-sm">
            {modalContent === 'post' && (
              <div className="bg-white p-8 rounded-2xl w-[600px] max-h-[80vh] overflow-y-auto shadow-2xl relative animate-fade-in">
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                >
                  <FontAwesomeIcon icon={faTimes} className="h-5 w-5" />
                </button>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Select Post or Reel
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                  Choose a post or reel from your connected account.
                </p>

                <div className="space-y-4 mb-6">
                  {videos.map((video) => (
                    <div
                      key={video.id}
                      onClick={() => handleVideoSelect(video)}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedVideo?.id === video.id
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-md overflow-hidden">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                            {video.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            Instagram Post
                          </p>
                        </div>
                        {selectedVideo?.id === video.id && (
                          <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                            <FontAwesomeIcon
                              icon={faCheck}
                              className="h-3 w-3"
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
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      selectedVideo
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Confirm Selection
                  </button>
                </div>
              </div>
            )}
            {modalContent === 'keywords' && (
              <div className="bg-white p-8 rounded-2xl w-[600px] max-h-[80vh] overflow-y-auto shadow-2xl relative animate-fade-in">
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                >
                  <FontAwesomeIcon icon={faTimes} className="h-5 w-5" />
                </button>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Setup Keywords
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Keywords are not case-sensitive. Type keywords separated by
                  commas.
                </p>

                <div className="mb-4">
                  <textarea
                    value={keywordInput}
                    onChange={handleKeywordInput}
                    placeholder="Type keywords separated by commas (e.g., discount, promo, sale)"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 outline-none transition-colors duration-200"
                    rows={3}
                  />
                  <button
                    onClick={handleAddKeyword}
                    className="mt-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors"
                  >
                    Add Keywords
                  </button>
                </div>

                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Selected Keywords
                  </h4>
                  {tempKeywords.length > 0 ? (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {tempKeywords.map((keyword) => (
                        <div
                          key={keyword.id}
                          className="inline-flex items-center bg-indigo-100 rounded-full px-3 py-1 text-sm"
                        >
                          {keyword.text}
                          <button
                            onClick={() => removeTempKeyword(keyword.id)}
                            className="ml-2 text-indigo-600 hover:text-indigo-800"
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
                    <p className="text-gray-400 text-sm">
                      No keywords added yet
                    </p>
                  )}
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveKeywords}
                    disabled={tempKeywords.length === 0}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      tempKeywords.length > 0
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Confirm Keywords
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TriggerComponent;
