import axios from 'axios';
import { toast } from 'react-toastify';
import appConfig from '../configs/app-config';
import { store } from '../store'; // Adjust the path to your Redux store

const unauthorizedCodes = [401];

const showErrorToast = (message: string) => {
  toast.error(message || 'Something went wrong');
};

const BaseService = axios.create({
  timeout: 60000,
  baseURL: appConfig.apiBaseUrl,
});

BaseService.interceptors.request.use(
  (config) => {
    if (navigator?.onLine !== true) {
      showErrorToast('Please enable internet');
      return Promise.reject(new Error('Network Error'));
    }

    // Retrieve token from Redux store
    const token = store.getState().user.userData.token;
    // const token =
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbnN0YVVzZXJJZCI6IjE3ODQxNDcyNjkzMDc5NjAxIiwiaWF0IjoxNzQ3MDI4NTMwLCJleHAiOjE3NDc2MzMzMzB9.BAHxVWD9tF8J2EEanKNX7Dp_XPGoEkcuI7VQLgJByoQ';
    // Add Authorization header if token exists
    if (token) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

BaseService.interceptors.response.use(
  (response) => {
    const data = response;
    const statusCode = response?.status;
    if (statusCode === 200 || statusCode === 202) {
      return data; // ⬅️ Return only the inner data object
    } else {
      if (unauthorizedCodes.includes(statusCode)) {
        toast.error('Unauthorized');
      } else {
        showErrorToast(data?.message);
      }
      return Promise.reject(data); // ⬅️ Consistent reject
    }
  },
  (error) => {
    const { response } = error;
    showErrorToast(response?.data?.message || 'Server error');
    return Promise.reject(error);
  },
);

export default BaseService;
