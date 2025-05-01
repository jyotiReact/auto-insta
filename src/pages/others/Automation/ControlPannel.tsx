import { FiSearch, FiMove, FiMaximize } from "react-icons/fi";
import { MdOutlineNavigation } from "react-icons/md";

export default function ControlsPanel() {
  return (
    <div className="fixed bottom-4 left-4 flex items-center gap-2 bg-white p-2 rounded-md shadow-md">
      <button className="p-2 hover:bg-gray-100 rounded">
        <FiSearch />
      </button>
      <select className="text-sm border rounded px-1 py-0.5">
        <option>100%</option>
      </select>
      <button className="p-2 hover:bg-gray-100 rounded">
        <FiMove />
      </button>
      <button className="p-2 hover:bg-purple-100 rounded text-purple-600 bg-purple-200">
        <MdOutlineNavigation />
      </button>
      <button className="p-2 hover:bg-gray-100 rounded">
        <FiMaximize />
      </button>
    </div>
  );
}
