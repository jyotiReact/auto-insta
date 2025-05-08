import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ClickOutside from '../../ClickOutside';
import UserOne from '../../../images/user/user-01.png';
import { useDispatch } from 'react-redux';
import { resetRole } from '../../../store/slices/userSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChevronDown, 
  faUser, 
  faAddressBook, 
  faGear, 
  faSignOutAlt,
  faEnvelope,
  faLock
} from '@fortawesome/free-solid-svg-icons';

const DropdownUser = ({ user }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <div
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity"
      >
        <div className="hidden text-right lg:block">
          <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
            {user?.username || 'Thomas Anree'}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {user?.account_type || 'User'}
          </p>
        </div>

        <div className="relative">
          <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
            <img
              src={user?.profile_picture_url || UserOne}
              alt="User"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white bg-green-500"></div>
        </div>

        <FontAwesomeIcon
          icon={faChevronDown}
          className={`text-gray-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
          style={{ width: 12, height: 8 }}
        />
      </div>

      {dropdownOpen && (
        <div className="absolute right-0 mt-3 w-56 rounded-lg bg-white shadow-xl border border-gray-100 dark:border-gray-700 dark:bg-gray-800 overflow-hidden z-50 animate-fade-in">
          <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {user?.username || 'Thomas Anree'}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {user?.email || 'user@example.com'}
            </p>
          </div>
          
          <ul className="py-1">
            <li>
              <Link
                to="/others/profile"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
              >
                <FontAwesomeIcon icon={faUser} className="mr-3 text-gray-400 w-4 h-4" />
                My Profile
              </Link>
            </li>
            {/* <li>
              <Link
                to="/settings"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
              >
                <FontAwesomeIcon icon={faGear} className="mr-3 text-gray-400 w-4 h-4" />
                Settings
              </Link>
            </li>
            <li>
              <Link
                to="/privacy"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
              >
                <FontAwesomeIcon icon={faLock} className="mr-3 text-gray-400 w-4 h-4" />
                Privacy
              </Link>
            </li> */}
          </ul>
          
          <div className="py-1 border-t border-gray-100 dark:border-gray-700">
            <button
              onClick={() => {
                dispatch(resetRole());
                navigate('/auth/connect-insta');
              }}
              className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-3 text-gray-400 w-4 h-4" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </ClickOutside>
  );
};

export default DropdownUser;