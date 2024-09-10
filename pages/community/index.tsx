import { Flex, Loader, TextInput, Title } from "@mantine/core";
import Navbar from "../../components/navbar";
import UserCard from "../../components/users-card";
import { useGetAllUsers } from "../../api-hooks/auth/query";
import { UserType } from "../../api-hooks/auth/model";
import { paginate } from "../../utils/paginate";
import IconSearch from "../../components/icons/icon-search";
import { useState } from "react";

export default function CommunityPage() {
  const { data, isLoading } = useGetAllUsers();
  const usersData: UserType[] = paginate(data?.data?.users || [], 100, 1);
  const [search, setSearch] = useState<string>("");

  const filteredUsers = usersData.filter((user) => {
    return user.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div style={{ minHeight: "100vh" }}>
      <Flex
        direction={"column"}
        justify={"center"}
        mt={20}
        align={"center"}
        gap={"md"}
      >
        <Title>Community</Title>
        <TextInput
          placeholder="Search..."
          rightSection={<IconSearch />}
          rightSectionPointerEvents="none"
          w={400}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Flex>
      <Flex
        direction={"row"}
        gap={"md"}
        wrap={"wrap"}
        justify={"center"}
        align={"center"}
        pt={"lg"}
        mb={80}
      >
        {isLoading && <Loader />}
        {filteredUsers.map((user) => (
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
