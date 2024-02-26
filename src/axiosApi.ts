import axios from 'axios';

const axiosApi = axios.create({
  baseURL: 'https://hw-71-orderingpizza-default-rtdb.firebaseio.com/'
});

export default axiosApi;