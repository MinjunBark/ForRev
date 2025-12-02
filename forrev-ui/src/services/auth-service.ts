import api from "../http-client";

export const getCSRFToken = async () => {
  const response = await api.get("/auth/csrf/");
  return response.data;
};

export const login = async (username: string, password: string) => {
  await api.get("/auth/csrf/");
  const response = await api.post("/auth/login/", { username, password });
  return response.data;
};