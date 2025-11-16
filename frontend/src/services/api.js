import axios from "axios";

const api = axios.create({
  baseURL: "/api/v1",
});

// получение данных
export const getAds = async (params) => {
  const response = await api.get("/ads", { params });
  return response.data;
};

export const getAdById = async (id) => {
  const response = await api.get(`/ads/${id}`);
  return response.data;
};

export const approveAd = async (id) => {
  const response = await api.post(`/ads/${id}/approve`);
  return response.data;
};

export const rejectAd = async (id, data) => {
  const response = await api.post(`/ads/${id}/reject`, data);
  return response.data;
};

export const requestChangesAd = async (id, data) => {
  const response = await api.post(`/ads/${id}/request-changes`, data);
  return response.data;
};

export const getStatsSummary = async (params) => {
  const response = await api.get("/stats/summary", { params });
  return response.data;
};

export const getActivityChart = async (params) => {
  const response = await api.get("/stats/chart/activity", { params });
  return response.data;
};

export const getDecisionsChart = async (params) => {
  const response = await api.get("/stats/chart/decisions", { params });
  return response.data;
};

export const getCategoriesChart = async (params) => {
  const response = await api.get("/stats/chart/categories", { params });
  return response.data;
};

export const getModeratorInfo = async () => {
  const response = await api.get("/moderators/me");
  return response.data;
};
