import axios from "axios";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
  timeout: 60000, // 1 min
  headers: {
    'Content-Type': 'application/json',
  },
});

function createCancelTokenConfig() {
  console.log("createCancelTokenConfig")
  const cancelTokenSource = axios.CancelToken.source();
  return {
    cancelToken: cancelTokenSource.token,
    cancel: cancelTokenSource.cancel,
  };
}
axiosClient.createCancelTokenConfig = createCancelTokenConfig;

// customize methods
// axiosClient.postMultipartFiles = axios.post(url, data, {
//   headers: {
//     'Content-Type': 'multipart/form-data',
//   },
// });


// Interceptors
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.token = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
      console.error('Request timed out (interceptors):', error);
      return Promise.reject({
        ...error,
        message: 'Request timed out. Please try again later.',
      });
    }
    return Promise.reject(error);
  }
);

export default axiosClient;