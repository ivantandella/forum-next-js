import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

const authKey = {
  getMeKey: ["get-me"],
  getAllUsersKey: ["get-all-users"],
};

async function getAllUsers() {
  const res = await axios.get(`${BASE_URL}/users`);
  return res.data;
}

export function useGetAllUsers() {
  return useQuery({
    queryKey: authKey.getAllUsersKey,
    queryFn: getAllUsers,
  });
}
