import { Flex, TextInput, Title } from "@mantine/core";
import IconSearch from "./icons/icon-search";
import { useContext } from "react";
import { SearchContext } from "../contexts/search-context";
import { useMediaQuery } from "@mantine/hooks";
import { useResponsive } from "../hooks/use-responsive";

export default function Header() {
  const { elemWidth } = useResponsive();
  const { search, setSearch } = useContext(SearchContext);

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
      <Title mt={10}>Forum App</Title>
      <TextInput
        placeholder="Search..."
        rightSection={<IconSearch />}
        rightSectionPointerEvents="none"
        w={elemWidth}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </Flex>
  );
}
