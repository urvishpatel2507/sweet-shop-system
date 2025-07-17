import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for error handling
api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(error.response.data.error || "Request failed");
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error("No response from server");
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(error.message);
    }
  }
);

export const getSweets = async () => {
  const response = await axios.get(`${API_BASE_URL}/sweets`);
  return response.data;
};

export const getSweetById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/sweets/${id}`);
  return response.data;
};

export const addSweet = async (sweetData) => {
  const response = await axios.post(`${API_BASE_URL}/sweets`, sweetData);
  return response.data;
};

export const updateSweet = async (id, sweetData) => {
  const response = await axios.put(`${API_BASE_URL}/sweets/${id}`, sweetData);
  return response.data;
};

export const deleteSweet = async (id) => {
  await axios.delete(`${API_BASE_URL}/sweets/${id}`);
};

export const purchaseSweet = async (id, quantity) => {
  const response = await axios.post(`${API_BASE_URL}/sweets/${id}/purchase`, {
    quantity,
  });
  return response.data;
};

export const restockSweet = async (id, quantity) => {
  const response = await axios.post(`${API_BASE_URL}/sweets/${id}/restock`, {
    quantity,
  });
  return response.data;
};

export const searchSweets = async (params) => {
  const response = await api.get("/sweets/search", { params });
  return response;
};
