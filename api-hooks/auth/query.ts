import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { getToken } from "../../utils/token";

const authKey = {
  getMeKey: ["get-me"],
  getAllUsersKey: ["get-all-users"],
};

async function getAllUsers() {
  const res = await axios.get(`${BASE_URL}/users`);
  return res.data;
}

async function getMe() {
  const res = await axios.get(`${BASE_URL}/users/me`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.data;
}

export function useGetAllUsers() {
  return useQuery({
    queryKey: authKey.getAllUsersKey,
    queryFn: getAllUsers,
  });
}

export function useGetMe() {
  return useQuery({
    queryKey: authKey.getMeKey,
    queryFn: getMe,
    staleTime: Infinity,
  });
}
