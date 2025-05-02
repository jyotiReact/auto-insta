import { FaBlogger } from 'react-icons/fa';

export const DefaultNode: React.FC<{
  id: string;
  data: { label: string; isConfigured?: boolean };
}> = ({ data }) => {
  return (
    <div className="w-[280px] h-[100px] flex items-center justify-center text-center text-pink-600 font-semibold text-sm bg-white border-none rounded-xl  transition-all duration-300 ">
      <div className="flex items-center gap-2">
        <div className="bg-pink-100 p-2 rounded-md text-pink-600">
          <FaBlogger className="w-5 h-5" />
        </div>
        <span className="font-semibold text-sm text-gray-800">
          {data.label}
        </span>
      </div>
    </div>
  );
};
