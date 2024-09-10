import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useQuery } from "@tanstack/react-query";

const threadsKey = {
  getAllThreadsKey: ["get-threads"],
};

async function getAllThreads() {
  const res = await axios.get(`${BASE_URL}/threads`);
  return res.data;
}

export function useGetAllThreads() {
  return useQuery({
    queryKey: threadsKey.getAllThreadsKey,
    queryFn: getAllThreads,
  });
}
