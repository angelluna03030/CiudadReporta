import api from "./api";

export const getForms = async () => {
  const response = await api.get("/api/form");
  return response.data;
};

export const createForm = async (data: any) => {
  const response = await api.post("/api/form", data);
  return response.data;
};