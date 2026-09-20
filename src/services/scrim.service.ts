import type { IScrim } from "../types/scrim";
import api from "./api";

export const getScrims = async () => {
  const response = await api.get("/scrims");
  return response.data.data;
};

export const getScrimById = async (id: string):Promise<IScrim> => {
  const response = await api.get(`/scrims/${id}`);
  return response.data.data;
};


export const deleteScrim = async (id: string) => {
  const response = await api.delete(`/scrims/${id}`);
  return response.data;
};
