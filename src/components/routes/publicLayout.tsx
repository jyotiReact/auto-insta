import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PublicLayout = () => {
  const token = useSelector((state: any) => state.user.userData.token);
  return token ? <Navigate to="/" /> : <Outlet />;
};

export default PublicLayout;
