// ActionNode.tsx

import { FaPlusCircle, FaRegCommentDots } from 'react-icons/fa';
import { Handle } from 'reactflow';

export const ActionNode = ({ data }) => {
  return (
    <div className="rounded-xl border-2 border-pink-600 bg-white shadow-md p-4 w-64 relative transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:to-pink-200">
      <Handle
        type="target"
        position="top"
        id="targetHandle"
        className="w-2 h-2 bg-pink-600"
      />

      <div className="flex items-center gap-2">
        <div className="bg-pink-100 p-2 rounded-md text-pink-600">
          <FaRegCommentDots className="w-5 h-5" />
        </div>
        <span className="font-semibold text-sm text-gray-800">
          {data.label}
        </span>
      </div>
      <p className="text-xs text-gray-500 mt-2">Not setup yet.</p>
    </div>
  );
};
