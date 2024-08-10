import axios, { AxiosResponse } from "axios";

const ServerURL = "http://192.168.29.16:8080";

// Define types for function parameters and return types
type Data = any; // Replace 'any' with more specific types based on your data structure

const getData = async (url: string): Promise<Data | null> => {
  try {
    const response: AxiosResponse<Data> = await axios.get(`${ServerURL}/${url}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    return null;
  }
};

const postData = async (url: string, body: Data): Promise<Data | null> => {
  try {
    const response: AxiosResponse<Data> = await axios.post(`${ServerURL}/${url}`, body);
    return response.data;
  } catch (error) {
    console.error(`Error posting data to ${url}:`, error);
    return null;
  }
};

const updateData = async (url: string, body: Data): Promise<Data | null> => {
  try {
    const response: AxiosResponse<Data> = await axios.put(`${ServerURL}/${url}`, body);
    return response.data;
  } catch (error) {
    console.error(`Error updating data at ${url}:`, error);
    return null;
  }
};

const deleteData = async (url: string): Promise<Data | null> => {
  try {
    const response: AxiosResponse<Data> = await axios.delete(`${ServerURL}/${url}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting data at ${url}:`, error);
    return null;
  }
};

export { ServerURL, getData, postData, updateData, deleteData };
