import { Navigate, Route, Routes } from 'react-router-dom';
import PrivateLayout from './privateLayout';
import PublicLayout from './publicLayout';
import Dashboard from '../../pages/Dashboard';
import Profile from '../../pages/others/profile';
import Settings from '../../pages/others/setting';
import SignIn from '../../pages/Authentication/SignIn';
import SignUp from '../../pages/Authentication/SignUp';
import ConnectInstagram from '../../pages/Authentication/ConnectInsta';
import InstagramConsent from '../../pages/Authentication/AllowInsta';
import ProfileSelector from '../../pages/Authentication/Profile';
import AutomationList from '../../pages/others/Automation';
import AutomationEditor from '../../pages/others/Automation/workFlow';

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<PrivateLayout />}>
        <Route index element={<Navigate replace to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path={`/others/profile`} element={<Profile />} />
        <Route path={`/others/setting`} element={<Settings />} />
        <Route path={`/automations`} element={<AutomationList />} />
        <Route
          path={`/automations/new-automation`}
          element={<AutomationEditor />}
        />
        <Route
          path={`/automations/:automationId`}
          element={<AutomationEditor />}
        />
      </Route>
      <Route element={<PublicLayout />}>
        <Route
          index
          element={<Navigate replace to={'/auth/connect-insta'} />}
        />
        {/* <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} /> */}
        <Route path="/auth/connect-insta" element={<ConnectInstagram />} />
        {/* <Route path="/auth/allow-insta" element={<InstagramConsent />} /> */}
        <Route path="/auth/profile" element={<ProfileSelector />} />

        <Route path="*" element={<h1>404: Page Not Found</h1>} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
