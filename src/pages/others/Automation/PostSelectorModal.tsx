import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PostSelectorModalProps } from '../../../types/triggerForm';
import { faCheck, faPlay, faTimes } from '@fortawesome/free-solid-svg-icons';

const PostSelectorModal: React.FC<PostSelectorModalProps> = ({
  isOpen,
  postData,
  selectedVideo,
  onClose,
  onSelect,
  onConfirm,
  triggerType,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-9999 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-2xl w-[600px]  h-[550px] shadow-2xl animate-fade-in">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-bold text-gray-900">
            {triggerType === 'INSTAGRAM_STORY_REPLIES'
              ? ' Select Story'
              : ' Select Post or Reel'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-pink-700 transition-colors duration-200"
          >
            <FontAwesomeIcon icon={faTimes} className="h-5 w-5" />
          </button>
        </div>
        <p className="text-sm text-gray-600 mb-6">
          {triggerType === 'INSTAGRAM_STORY_REPLIES'
            ? 'Choose a story from your connected account.'
            : 'Choose a post or reel from your connected account.'}
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
export default PostSelectorModal;
