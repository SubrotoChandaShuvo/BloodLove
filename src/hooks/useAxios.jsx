import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://bloodlove.vercel.app",
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
