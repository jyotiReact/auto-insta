import { Handle } from 'reactflow';
import { FaRegCommentDots, FaPlusCircle } from 'react-icons/fa';

export function TriggerNode({ data, selected }) {
  const handleAddClick = (e) => {
    e.stopPropagation();
    data.onAddActionNode();
  };
  return (
    <div className="relative">
      {' '}
      {/* New wrapper div for positioning the plus button */}
      {/* Main node container */}
      <div
        className={`rounded-xl border-2 ${
          selected ? 'border-pink-600 shadow-lg' : 'border-pink-300'
        } bg-white shadow-md p-4 w-64 relative transition-all min-h-20 duration-300 hover:-translate-y-1 hover:shadow-lg hover:to-pink-200`}
      >
        <div className="absolute -top-3 left-2 bg-white px-2 py-0.5 rounded-full border border-pink-300 text-xs text-pink-600 font-medium">
          Trigger
        </div>

        <div
          className={`flex items-center ${
            data.label && 'border-b border-pink-600 pb-2'
          }`}
        >
          <div
            className={`${
              data.label && 'bg-pink-100 mr-2'
            } p-1 rounded-md text-pink-600`}
          >
            <FaRegCommentDots className="w-5 h-5" />
          </div>
          <span className="font-semibold text-sm text-gray-800">
            {data.label}
          </span>
        </div>

        {data?.keywords?.length > 0 ? (
          <div className="flex flex-wrap gap-2 mb-4">
            <p className="text-xs text-gray-500 mt-2">
              Trigger on comments with keywords
            </p>
            {data?.keywords?.map((keyword) => (
              <div
                key={keyword.id}
                className="inline-flex items-center bg-pink-100 rounded-full px-3 py-1 text-xs"
              >
                {keyword.text}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-500 mt-2">Not setup yet.</p>
        )}

        <Handle
          type="source"
          position="bottom"
          className="w-2 h-2 bg-pink-600"
          id="sourceHandle"
        />
      </div>
      {/* Plus button hanging outside */}
      {data.isFirstTrigger && (
        <div
          onClick={handleAddClick}
          className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
        >
          <div className="relative">
            {/* Rope/dotted line */}
            <div className="absolute -top-3 left-1/2 w-0.5 h-3 bg-pink-300 transform -translate-x-1/2"></div>
            {/* Plus button */}
            <div className="text-pink-600 hover:text-pink-700 transition-colors duration-200 bg-white rounded-full p-1 shadow-md">
              <FaPlusCircle className="w-5 h-5" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
