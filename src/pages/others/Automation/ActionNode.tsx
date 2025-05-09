import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Handle } from 'reactflow';

export const ActionNode = ({ data, selected }) => {
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

        {/* Connection handle */}
        <Handle
          type="target"
          position="top"
          className="w-3 h-3 !bg-pink-500 !border-white !border-2"
          id="targetHandle"
        />

        {/* Content */}
        <div className="flex items-center space-x-3">
          <div className={`${
            data.label ? 'bg-gradient-to-br from-pink-100 to-pink-50' : 'bg-pink-50'
          } p-2 rounded-lg shadow-inner`}>
            <FontAwesomeIcon 
              icon={data.icon} 
              className="w-5 h-5 text-pink-600" 
            />
          </div>
          <span className="font-medium text-sm text-gray-800">
            {data.label || 'New Action'}
          </span>
        </div>

        {/* Subtle action indicator */}
        <div className="absolute -top-3 left-3 bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-0.5 rounded-full text-xs text-white font-semibold shadow-sm">
          Action
        </div>
      </div>
    </div>
  );
};