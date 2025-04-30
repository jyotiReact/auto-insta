import React from 'react';

interface ActionInput {
  label: string;
}

interface ActionNodeData {
  label: string;
  inputs: ActionInput[];
}

const ActionNode: React.FC<{ data: ActionNodeData }> = ({ data }) => (
  <div className="px-4 py-3 shadow-md rounded-md bg-white border border-gray-200 w-64">
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
        <svg
          className="w-4 h-4 text-pink-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </div>
      <div className="font-semibold">Action</div>
    </div>
    <div className="mt-2">
      <div className="text-sm font-medium text-gray-700">{data.label}</div>
      {data.inputs && (
        <div className="mt-2 space-y-2">
          {data.inputs.map((input, idx) => (
            <div key={idx} className="text-xs bg-gray-50 p-2 rounded">
              {input.label}
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

export default ActionNode;