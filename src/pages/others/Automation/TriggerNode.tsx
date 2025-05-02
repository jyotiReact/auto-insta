import { Handle } from 'reactflow';
import { FaRegCommentDots, FaPlusCircle } from 'react-icons/fa';

export function TriggerNode({ data }) {
  return (
    <div className="rounded-xl border-2 border-pink-600 bg-white shadow-md p-4 w-64 relative transition-all min-h-20 max-h-[160px] duration-300 hover:-translate-y-1 hover:shadow-lg hover:to-pink-200">
      <div className="absolute -top-3 left-2 bg-white px-2 py-0.5 rounded-full border border-pink-300 text-xs text-pink-600 font-medium">
        Trigger
      </div>
      <div className="flex items-center gap-2">
        <div className="bg-pink-100 p-2 rounded-md text-pink-600">
          <FaRegCommentDots className="w-5 h-5" />
        </div>
        <span className="font-semibold text-sm text-gray-800">
          {data.label}
        </span>
      </div>

      {data?.keywords?.length > 0 ? (
        <div className="flex flex-wrap gap-2 mb-4">
          {keywords.map((keyword) => (
            <div
              key={keyword.id}
              className="inline-flex items-center bg-pink-100 rounded-full px-3 py-1 text-sm"
            >
              {keyword.text}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-gray-500 mt-2">Not setup yet.</p>
      )}

      {data.isFirstTrigger && (
        <div
          onClick={data.onAddActionNode}
          className="mt-2 flex justify-center cursor-pointer text-pink-600 hover:text-pink-700 transition-colors duration-200"
        >
          <FaPlusCircle className="w-5 h-5" />
        </div>
      )}

      <Handle
        type="source"
        position="bottom"
        className="w-2 h-2 bg-pink-600"
        id="sourceHandle"
      />
    </div>
  );
}
