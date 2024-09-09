import { Flex, TextInput, Title } from "@mantine/core";
import IconSearch from "./icons/icon-search";

export default function Header() {
  return (
    <Flex
      direction={"column"}
      gap={"md"}
      justify={"center"}
      align={"center"}
      pos={"fixed"}
      w={"100%"}
      top={0}
      bg={"white"}
      pb={20}
      style={{ zIndex: 1 }}
    >
      <Title>Forum App</Title>
      <TextInput
        placeholder="Search..."
        rightSection={<IconSearch />}
        rightSectionPointerEvents="none"
        w={400}
      />
    </Flex>
  );
}
