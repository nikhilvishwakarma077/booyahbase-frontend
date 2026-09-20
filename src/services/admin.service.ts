import api from "./api";

interface AdminLoginData {
  email: string;
  password: string;
}

export const adminLogin = async (data: AdminLoginData) => {
  const response = await api.post("/admin/login", data);
  return response.data.data;
};

export const adminMe = async () => {
  const response = await api.get("/admin/me");
  return response.data.data;
};

export const adminLogout = async () => {
  const response = await api.post("/admin/logout");
  return response.data.data;
};