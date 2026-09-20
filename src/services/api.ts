import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const getOrganizers = async () => {
  const response = await api.get("/api/organizers");
  return response.data;
};

export const getOrganizerById = async (id: string) => {
  const response = await api.get(`/api/organizers/${id}`);
  return response.data;
};

export default api;


