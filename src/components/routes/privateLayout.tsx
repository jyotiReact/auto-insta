import { Navigate, Outlet } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';
import { useSelector } from 'react-redux';

const PrivateLayout = () => {
  const token = useSelector((state: any) => state.user.userData.token);
  // console.log(token);
  return token ? (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  ) : (
    <Navigate to="/auth/connect-insta" />
  );
};

export default PrivateLayout;
