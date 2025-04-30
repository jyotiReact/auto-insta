import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PublicLayout = () => {
  const authority = useSelector((state: any) => state.user.userData.authority);
  return authority ? <Navigate to="/" /> : <Outlet />;
};

export default PublicLayout;
