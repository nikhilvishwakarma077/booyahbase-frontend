import api from "./api";
import type { IOrganizer } from "../types/organizer";

export const getOrganizers = async (): Promise<IOrganizer[]> => {
  const response = await api.get("/organizers");
  return response.data.data;
};

export const getOrganizerById = async (
  id: string
): Promise<IOrganizer> => {
  const response = await api.get(`/organizers/${id}`);
  return response.data.data;
};

export interface CreateOrganizerData {
  name: string;
  whatsappNumber: string;
  orgImg: string;
  contactInformation?: {
    email?: string;
    instagram?: string;
    discord?: string;
    telegram?: string;
  };
  description?: string;
  isVerified?: boolean;
}

export const createOrganizer = async (
  data: CreateOrganizerData
): Promise<IOrganizer> => {
  const response = await api.post("/organizers", data);
  return response.data.data;
};

export const deleteOrganizer = async (id: string) => {
  const response = await api.delete(`/organizers/${id}`);
  return response.data;
};


export const updateOrganizer = async (
  id: string,
  data: {
    name: string;
    whatsappNumber: string;
    orgImg: string;
    contactInformation: {
      email?: string;
      instagram?: string;
      discord?: string;
      telegram?: string;
    };
    description: string;
    isVerified: boolean;
  }
) => {
  const response = await api.put(`/organizers/${id}`, data);

  return response.data;
};