import { Flex, Loader, Text, Title } from "@mantine/core";
import Navbar from "../../components/navbar";
import UserCard from "../../components/users-card";
import { useGetLeaderboards } from "../../api-hooks/leaderboards/query";
import { LeaderboardType } from "../../api-hooks/leaderboards/model";

export default function LeaderboardPage() {
  const { data, isLoading } = useGetLeaderboards();
  const leaderboardsData: LeaderboardType[] = data?.data?.leaderboards || [];

  return (
    <div style={{ minHeight: "100vh" }}>
      <Flex
        direction={"column"}
        gap={"md"}
        justify={"center"}
        align={"center"}
        pt={"lg"}
        mb={80}
      >
        <Title>🏅Leaderboard🏅</Title>
        <Text>Let's see our top scorer!!!</Text>
        {isLoading && <Loader pos={"absolute"} top={"50%"} bottom={"50%"} />}
        {leaderboardsData.map((leaderboard) => (
          <UserCard
            key={leaderboard.user.id}
            name={leaderboard.user.name}
            mail={leaderboard.user.email}
            avatar={leaderboard.user.avatar}
            score={leaderboard.score}
          />
        ))}
      </Flex>

      <Navbar />
    </div>
  );
}
