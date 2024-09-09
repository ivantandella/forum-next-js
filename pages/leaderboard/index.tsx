import { Flex, Text, Title } from "@mantine/core";
import Navbar from "../../components/navbar";
import UserCard from "../../components/users-card";

export default function LeaderboardPage() {
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
        <UserCard
          name="John Doe"
          mail="john@mail.com"
          avatar="/forum-logo.png"
          score={100}
        />
        <UserCard
          name="John Doe"
          mail="john@mail.com"
          avatar="/forum-logo.png"
          score={77}
        />
        <UserCard
          name="John Doe"
          mail="john@mail.com"
          avatar="/forum-logo.png"
          score={50}
        />
        <UserCard
          name="John Doe"
          mail="john@mail.com"
          avatar="/forum-logo.png"
          score={10}
        />
        <UserCard
          name="John Doe"
          mail="john@mail.com"
          avatar="/forum-logo.png"
          score={0}
        />
      </Flex>

      <Navbar />
    </div>
  );
}
