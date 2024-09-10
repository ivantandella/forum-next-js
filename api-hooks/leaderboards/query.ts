import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useQuery } from "@tanstack/react-query";

const leaderboardKey = {
  getLeaderboardsKey: ["get-leaderboards"],
};

async function getLeaderboards() {
  const res = await axios.get(`${BASE_URL}/leaderboards`);
  return res.data;
}

export function useGetLeaderboards() {
  return useQuery({
    queryKey: leaderboardKey.getLeaderboardsKey,
    queryFn: getLeaderboards,
  });
}
