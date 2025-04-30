import React from 'react';

const DefaultNode: React.FC<{ data: { label: string } }> = ({ data }) => (
  <div
    className="px-4 py-10 rounded-xl bg-white border-2 shadow-md w-72 transition-all border-purple-500"
  >
    <div>
      <div className="flex items-center gap-2">
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
        <div className="text-sm font-semibold text-gray-800">{data.label}</div>
      </div>
    </div>
  </div>
);

export default DefaultNode;