export const TriggerList: React.FC = ({ items, onClick }) => (
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