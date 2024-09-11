import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useQuery } from "@tanstack/react-query";

export const threadsKey = {
  getAllThreadsKey: ["get-threads"],
  getDetailThreadKey: (id: string) => ["get-detail-thread", id],
};

async function getAllThreads() {
  const res = await axios.get(`${BASE_URL}/threads`);
  return res.data;
}

async function getDetailThread(id: string) {
  const res = await axios.get(`${BASE_URL}/threads/${id}`);
  return res.data;
}

export function useGetAllThreads() {
  return useQuery({
    queryKey: threadsKey.getAllThreadsKey,
    queryFn: getAllThreads,
  });
}

export function useGetDetailThread(id: string) {
  return useQuery({
    queryKey: threadsKey.getDetailThreadKey(id),
    queryFn: () => getDetailThread(id),
  });
}
