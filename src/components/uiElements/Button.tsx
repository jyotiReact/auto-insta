import React from 'react';

interface ButtonPropsTypes {
  styles?: React.CSSProperties;
  icon?: React.ReactNode;
  label: string;
  handleClick?: () => void;
}

const Button: React.FC<ButtonPropsTypes> = ({
  label,
  styles,
  icon,
  handleClick,
}) => {
  return (
    <div className="mb-5">
      <button
        type="submit"
        onClick={handleClick}
        style={styles}
        className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90 flex items-center justify-center gap-2"
      >
        {icon && <span>{icon}</span>}
        {label}
      </button>
    </div>
  );
};

export default Button;

// import React, { useEffect, useState } from 'react';

// const Navbar = () => {
//   const [role, setRole] = useState(null);

//   // Get the user role from localStorage when the component mounts
//   useEffect(() => {
//     const userRole = localStorage.getItem('userRole');
//     setRole(userRole);
//   }, []);

//   // Define common and role-specific menu items
//   const commonMenus = {
//     adminDashboard: { name: "Admin Dashboard", link: "/admin/dashboard" },
//     userManagement: { name: "User Management", link: "/usermanagement" }
//   };

//   const menuItems = {
//     admin: [
//       commonMenus.adminDashboard,
//       commonMenus.userManagement,
//     ],
//     subAdmin: [
//       commonMenus.userManagement, // Both admin and sub-admin can see this
//     ],
//     editor: [
//       { name: "Manage Posts", link: "/editor/posts" },
//     ],
//     user: [
//       { name: "Profile", link: "/profile" },
//     ]
//   };

//   // Handle Logout
//   const handleLogout = () => {
//     localStorage.removeItem("userRole"); // Clear the role from localStorage
//     window.location.href = "/login"; // Redirect to login page after logout
//   };

//   return (
//     <nav>
//       <ul>
//         <li><a href="/">Home</a></li>

//         {/* Render role-based menu items dynamically */}
//         {role && menuItems[role]?.map((item, index) => (
//           <li key={index}>
//             <a href={item.link}>{item.name}</a>
//           </li>
//         ))}

//         {/* Common Logout */}
//         <li><a href="#" onClick={handleLogout}>Logout</a></li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;
