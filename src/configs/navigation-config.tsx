import DashboardIcon from '../images/svg/dashboardIcon';

export const menuItems = [
  {
    path: '/dashboard',
    icon: <DashboardIcon />,
    label: 'Dashboard',
    roles: ['admin'],
  },
  {
    path: '/automations',
    icon: <DashboardIcon />,
    label: 'Automations',
    roles: ['admin'],
  },

  {
    icon: <DashboardIcon />,
    label: 'Others',
    roles: ['admin'],
    submenu: [
      { path: '/others/profile', label: 'Profile', roles: ['admin'] },
      { path: '/others/setting', label: 'Settings', roles: ['subadmin'] },
    ],
  },
];
