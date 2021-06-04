import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: '3e631f6baf3ffc8883931e4a563030b2',
  },
});

export default axiosInstance;
