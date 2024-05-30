import axios from "axios";

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_ROOT}/api`,
  withCredentials: true, // withCredentials 설정
});

// 요청 인터셉터 설정
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken");
    console.log("tojwtTokenjwtTokenken", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터 설정
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 403) {
      localStorage.removeItem("jwtToken");
      window.location.href = "/login";
      console.log(error.response.data.message);
    }
    return Promise.reject(error);
  },
);

export default api;
