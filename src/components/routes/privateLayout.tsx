import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';
import { useSelector } from 'react-redux';

const PrivateLayout = () => {
  const authority = useSelector((state: any) => state.user.userData.authority);
  return authority ? (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  ) : (
    <Navigate to="/auth/signin" />
  );
};

export default PrivateLayout;
