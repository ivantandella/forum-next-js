import { Flex, Title } from "@mantine/core";
import Navbar from "../../components/navbar";
import UserCard from "../../components/users-card";
import { useGetAllUsers } from "../../api-hooks/auth/query";
import { UserType } from "../../api-hooks/auth/model";

export default function CommunityPage() {
  const { data } = useGetAllUsers();

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
        {data.data.users.map((user: UserType) => (
          <UserCard
            key={user.id}
            name={user.name}
            mail={user.email}
            avatar={user.avatar}
          />
        ))}
      </Flex>

      <Navbar />
    </div>
  );
}
