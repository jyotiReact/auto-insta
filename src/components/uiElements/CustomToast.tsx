import { toast } from 'react-hot-toast';
import { FaExclamationTriangle } from 'react-icons/fa';

const CustomToast = (message: string): void => {
  toast.custom((t) => (
    <div
      className={`${
        t.visible ? 'top-5 opacity-100 scale-100' : '-top-20 opacity-0 scale-90'
      } transition-all duration-500 ease-in-out fixed left-1/2 transform -translate-x-1/2 z-50 
        bg-red-100 text-red-700 px-4 py-3 w-[300px] rounded-2xl shadow-lg flex items-center space-x-3`}
    >
      <FaExclamationTriangle className="text-red-600 text-xl flex-shrink-0" />
      <span className="text-sm font-medium">{message}</span>
    </div>
  ));
};

export default CustomToast;
