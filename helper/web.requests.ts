import axiosInstance from "./AxiosInstance";

interface RequestBody {
  [key: string]: any;
}

export const get = async (url: string, params?: RequestBody) => {
  try {
    const response = await axiosInstance.get(url, { params });
    return response;
  } catch (error) {
    throw error;
  }
};

export const post = async (url: string, data?: RequestBody) => {
  try {
    const response = await axiosInstance.post(url, data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const put = async (url: string, data?: RequestBody) => {
  try {
    const response = await axiosInstance.put(url, data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteRequest = async (url: string, data?: RequestBody) => {
  try {
    const response = await axiosInstance.delete(url, { data });
    return response;
  } catch (error) {
    throw error;
  }
};
