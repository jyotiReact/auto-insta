import { Handle } from 'reactflow';
import { FaRegCommentDots, FaPlusCircle } from 'react-icons/fa';

export function TriggerNode({ data, selected }) {
  const handleAddClick = (e) => {
    e.stopPropagation();
    data.onAddActionNode();
  };

  return (
    <div className="relative group">
      {/* Main Node Container */}
      <div
        className={`relative rounded-xl border-2 ${
          selected ? 'border-pink-500 shadow-lg' : 'border-pink-200'
        } bg-gradient-to-br from-pink-50 to-white p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 w-[280px] h-[100px] flex items-center justify-center`}
      >
        {/* Glow effect when selected */}
        {selected && (
          <div className="absolute inset-0 rounded-xl bg-pink-100 opacity-30 pointer-events-none"></div>
        )}

        {/* Trigger badge */}
        <div className="absolute -top-3 left-3 bg-gradient-to-r from-pink-500 to-rose-500 px-3 py-0.5 rounded-full text-xs text-white font-semibold shadow-sm">
          Trigger
        </div>

        {/* Content */}
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-pink-100 to-pink-50 p-2 rounded-lg shadow-inner">
            <FaRegCommentDots className="w-5 h-5 text-pink-600" />
          </div>
          <span className="font-medium text-sm text-gray-800">
            {data.label || 'New Trigger'}
          </span>
        </div>

        {/* Connection handle */}
        <Handle
          type="source"
          position="bottom"
          className="w-3 h-3 !bg-pink-500 !border-white !border-2"
          id="sourceHandle"
        />
      </div>

      {/* Plus button (only for first trigger) */}
      {data?.isFirstTrigger && (
        <div
          onClick={handleAddClick}
          className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 cursor-pointer transition-all duration-300 group-hover:scale-110"
        >
          <div className="relative">
            {/* Elegant connector line */}
            <div className="absolute -top-3 left-1/2 w-0.5 h-3 bg-gradient-to-t from-pink-300 to-transparent transform -translate-x-1/2"></div>
            
            {/* Plus button with gradient */}
            <div className="bg-gradient-to-br from-pink-400 to-rose-500 text-white rounded-full p-1.5 shadow-lg hover:shadow-xl transition-all duration-300 hover:from-pink-500 hover:to-rose-600">
              <FaPlusCircle className="w-5 h-5" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}