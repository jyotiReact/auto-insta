// ActionNode.tsx

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Handle } from 'reactflow';

export const ActionNode = ({ data }) => {
  return (
    <div className="rounded-xl border-2 border-pink-600 bg-white shadow-md p-4 w-64 relative transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:to-pink-200 flex items-center justify-center min-h-20 max-h-[160px] ">
      <Handle
        type="target"
        position="top"
        id="targetHandle"
        className="w-2 h-2 bg-pink-600"
      />

      <div
        className={`flex items-center  ${
          data.label && 'border-b border-pink-600 pb-2'
        } `}
      >
        <div
          className={`${
            data.label && 'bg-pink-100  mr-2  '
          } p-1 rounded-md text-pink-600`}
        >
          <FontAwesomeIcon icon={data.icon} className="w-5 h-5 " />
        </div>
        <span className="font-semibold text-sm text-gray-800  ">
          {data.label}
        </span>
      </div>
    </div>
  );
};
