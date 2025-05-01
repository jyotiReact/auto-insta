import { Handle } from 'reactflow';
import { FaRegCommentDots } from 'react-icons/fa';

export function TriggerNode({ data }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow p-4 w-64 relative">
      <div className="absolute -top-3 left-2 bg-white px-2 py-0.5 rounded-full border text-xs text-gray-500">
        Trigger
      </div>
      <div className="flex items-center gap-2">
        <div className="bg-purple-100 p-2 rounded-md text-purple-600">
          <FaRegCommentDots />
        </div>
        <span className="font-medium text-sm">{data.label}</span>
      </div>
      <p className="text-xs text-gray-400 mt-2">Not setup yet.</p>

      <Handle type="source" position="bottom" className="w-2 h-2 bg-purple-500" />
    </div>
  );
}

export function AddNode() {
  return (
    <div className="w-64 h-20 border-2 border-dashed border-purple-300 rounded-xl flex items-center justify-center text-purple-500 text-xl font-bold">
      +
      <Handle type="target" position="top" className="w-2 h-2 bg-purple-500" />
    </div>
  );
}
