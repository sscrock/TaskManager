import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/",
});

export const createTask = (task) => {
  return api.post("tasks", task);
};

export const deleteTask = (id) => {
  return api.delete(`tasks/${id}`);
};

export const updateTask = (id, task) => {
  return api.put(`tasks/${id}`, task);
};

export const getTaskById = (id) => {
  return api.get(`tasks/${id}`);
};

export const getTasks = () => {
  return api.get("tasks");
};
