import { FaBlogger, FaCommentAlt } from 'react-icons/fa';

export const DefaultNode: React.FC<{
  id: string;
  data: { label: string; isConfigured?: boolean };
}> = ({ data }) => {
  return (
    <div className="rounded-xl border-none bg-white p-4 h-full w-full relative transition-all duration-300 hover:-translate-y-1  hover:to-pink-200 flex items-center justify-center">
      <div className="flex items-center gap-2">
        <div className="bg-pink-100 p-2 rounded-md text-pink-600">
        <FaBlogger className="w-5 h-5" />        </div>
        <span className="font-semibold text-sm text-gray-800">
          {data.label}
        </span>
      </div>
    </div>
  );
};
