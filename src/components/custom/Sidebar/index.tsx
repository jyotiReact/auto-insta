import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SidebarLinkGroup from './SidebarLinkGroup';
import Logo from '../../../images/logo/logo.svg';
import { useSelector } from 'react-redux';
import { menuItems } from '../../../configs/navigation-config';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;
  const userData = useSelector((state: any) => state.user.userData.info);
  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);
  const [filteredMenu, setFilteredMenu] = useState<any[]>([]);
  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
  );

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  useEffect(() => {
    const filteredMenuItems = menuItems
      .filter((item) => item.roles.includes('admin'))
      .map((item) => {
        if (item.submenu) {
          return {
            ...item,
            submenu: item.submenu.filter((subItem) =>
              subItem.roles.includes('admin'),
            ),
          };
        }
        return item;
      });

    setFilteredMenu(filteredMenuItems || []);
  }, []);
  // useEffect(() => {
  //   const filteredMenuItems = menuItems
  //     .filter((item) => item.roles.includes(userData.role))
  //     .map((item) => {
  //       if (item.submenu) {
  //         return {
  //           ...item,
  //           submenu: item.submenu.filter((subItem) =>
  //             subItem.roles.includes(userData.role),
  //           ),
  //         };
  //       }
  //       return item;
  //     });

  //   // setFilteredMenu(filteredMenuItems || []);
  // }, [userData.role]);

  return (
    <aside
      ref={sidebar}
      className={`fixed left-0 top-0 flex h-screen w-60 flex-col overflow-y-hidden bg-white duration-300 ease-linear lg:static lg:translate-x-0  border-r border-pink-100 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between gap-2 pb-3">
        <NavLink to="/">
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent px-6 py-3 inline-block drop-shadow-lg hover:scale-105 transition transform duration-300 ease-in-out">
            Insta Automate
          </h1>
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden p-2 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-600 transition-colors duration-200"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill="#E1306C"
            />
          </svg>
        </button>
      </div>

      {/* User Profile Section */}
      <div className="flex flex-col items-center gap-4 px-6 py-4 border-b border-pink-200 bg-gradient-to-b from-pink-50 to-white">
        {/* Profile Info */}
        <div className="flex items-center gap-4 w-full">
          <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-pink-500 shadow-sm hover:shadow-md transition-shadow duration-200">
            {userData?.profile_picture_url ? (
              <img
                src={userData.profile_picture_url}
                alt="Profile"
                className="h-full w-full object-cover hover:scale-105 transition-transform duration-200"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center text-pink-600 font-bold text-xl">
                {userData?.username?.charAt(0).toUpperCase() || 'U'}
              </div>
            )}
          </div>
          <div>
            <p className="font-semibold text-gray-800 text-lg">
              {userData?.username || 'User'}
            </p>
            <p className="text-xs text-pink-600 bg-pink-100 px-2 py-0.5 rounded-full inline-block capitalize">
              {userData?.account_type || 'User'}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-between w-full px-2">
          <div className="flex flex-col items-center gap-1">
            <span className="font-bold text-gray-800 text-lg">
              {userData?.followers_count?.toLocaleString() || '0'}
            </span>
            <span className="text-xs text-gray-500 tracking-wider ">
              Followers
            </span>
          </div>
          <div className="h-8 w-px bg-pink-200"></div>
          <div className="flex flex-col items-center gap-1">
            <span className="font-bold text-gray-800 text-lg">
              {userData?.follows_count?.toLocaleString() || '0'}
            </span>
            <span className="text-xs text-gray-500 tracking-wider">
              Following
            </span>
          </div>
          <div className="h-8 w-px bg-pink-200"></div>
          <div className="flex flex-col items-center gap-1">
            <span className="font-bold text-gray-800 text-lg">
              {userData?.media_count?.toLocaleString() || '0'}
            </span>
            <span className="text-xs text-gray-500 tracking-wider">Posts</span>
          </div>
        </div>
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-gray-600">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {filteredMenu.map(({ path, icon, label, submenu }, index) => {
                return (
                  <SidebarLinkGroup
                    key={index}
                    activeCondition={
                      pathname === path || pathname.includes(path)
                    }
                  >
                    {(handleClick, open) => (
                      <React.Fragment>
                        <NavLink
                          to={path}
                          className={`group relative flex items-center gap-2.5 rounded-lg px-4 py-2 font-medium text-gray-800 duration-300 ease-in-out hover:bg-pink-100 hover:text-pink-700 ${
                            pathname === path || pathname.includes(path)
                              ? 'bg-pink-100 text-pink-700'
                              : ''
                          }`}
                          onClick={(e) => {
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true);
                          }}
                        >
                          <span className="text-pink-600">{icon}</span>
                          {label}
                          {submenu && (
                            <svg
                              className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current transition-transform duration-200 text-pink-600 ${
                                open ? 'rotate-180' : ''
                              }`}
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                                fill="#E1306C"
                              />
                            </svg>
                          )}
                        </NavLink>

                        {submenu && (
                          <div
                            className={`translate transform overflow-hidden ${
                              !open && 'hidden'
                            }`}
                          >
                            <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                              {submenu.map((subItem: any, subIndex: number) => {
                                return (
                                  <li key={subIndex}>
                                    <NavLink
                                      to={subItem.path}
                                      className={({ isActive }) =>
                                        `group relative flex items-center gap-2.5 rounded-md px-4 py-2 font-medium text-gray-600 duration-300 ease-in-out hover:bg-pink-50 hover:text-pink-600 ${
                                          isActive
                                            ? 'bg-pink-50 text-pink-600'
                                            : ''
                                        }`
                                      }
                                    >
                                      {subItem.label}
                                    </NavLink>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        )}
                      </React.Fragment>
                    )}
                  </SidebarLinkGroup>
                );
              })}
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
