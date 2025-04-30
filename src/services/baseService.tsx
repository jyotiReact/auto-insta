import axios from 'axios';
import { toast } from 'react-toastify';
import appConfig from '../configs/app-config';

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
    if (navigator?.onLine === true) {
      return config;
    } else {
      showErrorToast('Please enable internet');
      return Promise.reject(new Error('Network Error'));
    }
  },
  (error) => {
    return Promise.reject(error); 
  },
);

BaseService.interceptors.response.use(
  (response) => {
    if (
      response?.data.statusCode === 200 ||
      response?.data.statusCode === 202
    ) {
      return response;
    } else {
      const statusCode = response?.data?.statusCode;
      if (unauthorizedCodes.includes(statusCode)) {
        toast.error('unauthorized');
      } else {
        showErrorToast(response?.data?.message);
      }
      return Promise.reject(response);
    }
  },
  (error) => {
    const { response } = error;
    showErrorToast(response?.data?.message || 'Server error');

    // If unauthorized, handle logout
    // if (response && unauthorizedCodes.includes(response?.status)) {
    //   store.dispatch(onSignOutSuccess());
    // }

    return Promise.reject(error);
  },
);

export default BaseService;
