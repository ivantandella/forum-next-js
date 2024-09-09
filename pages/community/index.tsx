import { Flex, Title } from "@mantine/core";
import Navbar from "../../components/navbar";
import UserCard from "../../components/users-card";

export default function CommunityPage() {
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
        <Title>Community</Title>
        <UserCard
          name="John Doe"
          mail="john@mail.com"
          avatar="/forum-logo.png"
        />
        <UserCard
          name="John Doe"
          mail="john@mail.com"
          avatar="/forum-logo.png"
        />
        <UserCard
          name="John Doe"
          mail="john@mail.com"
          avatar="/forum-logo.png"
        />
        <UserCard
          name="John Doe"
          mail="john@mail.com"
          avatar="/forum-logo.png"
        />
        <UserCard
          name="John Doe"
          mail="john@mail.com"
          avatar="/forum-logo.png"
        />
      </Flex>

      <Navbar />
    </div>
  );
}
