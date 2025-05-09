import { FaBlogger } from 'react-icons/fa';

export const DefaultNode: React.FC<{
  id: string;
  data: { label: string; isConfigured?: boolean };
}> = ({ data }) => {
  return (
    <div className="relative group w-[280px] h-[100px]">
      {/* Main Node Container */}
      <div className="relative h-full flex items-center justify-center text-center bg-gradient-to-br from-pink-50 to-white rounded-xl border-2 border-pink-200 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
        {/* Subtle pulse animation for empty state */}
        {!data.isConfigured && (
          <div className="absolute inset-0 rounded-xl border-2 border-dashed border-pink-300 animate-pulse opacity-70 pointer-events-none"></div>
        )}

        {/* Content */}
        <div className="flex items-center space-x-3 px-4 py-3">
          <div className="bg-gradient-to-br from-pink-100 to-pink-50 p-2 rounded-lg shadow-inner">
            <FaBlogger className="w-5 h-5 text-pink-600" />
          </div>
          <span className="font-medium text-sm text-gray-800">
            {data.label || 'Set up your trigger'}
          </span>
        </div>

        {/* Status indicator */}
        <div className="absolute -top-3 left-3 bg-gradient-to-r from-pink-400 to-pink-500 px-3 py-0.5 rounded-full text-xs text-white font-semibold shadow-sm">
          {data.isConfigured ? 'Ready' : 'Setup'}
        </div>
      </div>
    </div>
  );
};