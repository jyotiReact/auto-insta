import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ClickOutside from '../../ClickOutside';
import UserOne from '../../../images/user/user-01.png';
import { useDispatch } from 'react-redux';
import { resetRole } from '../../../store/slices/userSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faUser, faAddressBook, faGear, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const DropdownUser = ({ user }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <Link
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        to="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-semibold text-gray-900">
            {user?.username || 'Thomas Anree'}
          </span>
          <span className="block text-xs text-gray-600">{user?.account_type || 'User'}</span>
        </span>

        <span className="h-12 w-12 rounded-full border-2 border-gradient-to-r from-pink-400 to-purple-400 p-0.5">
          <img
            src={user?.profile_picture_url || UserOne}
            alt="User"
            className="h-full w-full rounded-full object-cover"
          />
        </span>

        <FontAwesomeIcon
          icon={faChevronDown}
          className="hidden text-pink-600 sm:block"
          style={{ width: 12, height: 8 }}
        />
      </Link>

      {dropdownOpen && (
        <div
          className="absolute right-0 mt-4 w-64 flex flex-col rounded-lg border border-pink-200 bg-white shadow-xl"
        >
          <ul className="flex flex-col gap-4 border-b border-pink-100 px-6 py-6">
            <li>
              <Link
                to="/others/profile"
                className="flex items-center gap-3 text-sm font-medium text-gray-800 hover:bg-pink-50 hover:text-pink-600 rounded-md px-3 py-2 transition-all duration-300"
              >
                <FontAwesomeIcon icon={faUser} className="text-pink-600" />
                My Profile
              </Link>
            </li>
            {/* <li>
              <Link
                to="#"
                className="flex items-center gap-3 text-sm font-medium text-gray-800 hover:bg-pink-50 hover:text-pink-600 rounded-md px-3 py-2 transition-all duration-300"
              >
                <FontAwesomeIcon icon={faAddressBook} className="text-pink-600" />
                My Contacts
              </Link>
            </li> */}
            {/* <li>
              <Link
                to="/settings"
                className="flex items-center gap-3 text-sm font-medium text-gray-800 hover:bg-pink-50 hover:text-pink-600 rounded-md px-3 py-2 transition-all duration-300"
              >
                <FontAwesomeIcon icon={faGear} className="text-pink-600" />
                Account Settings
              </Link>
            </li> */}
          </ul>
          <button
            onClick={() => {
              dispatch(resetRole());
              navigate('/auth/connect-insta');
            }}
            className="flex items-center gap-3 px-6 py-4 text-sm font-medium text-gray-800 hover:bg-pink-50 hover:text-pink-600 rounded-b-md transition-all duration-300"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="text-pink-600" />
            Log Out
          </button>
        </div>
      )}
    </ClickOutside>
  );
};

export default DropdownUser;