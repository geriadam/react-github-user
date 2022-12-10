import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    "Content-type": "application/json",
  },
});

export const fetchUsers = async (username: string): Promise<any[]> => {
  const response = await apiClient.get(`/search/users?q=${username}&per_page=5`);
  const users = response.data.items;
  return users;
};

export const fetchRepos = async (username: string): Promise<any[]>  => {
  const response = await apiClient.get(`users/${username}/repos`);
  const repos = response.data;
  return repos;
};