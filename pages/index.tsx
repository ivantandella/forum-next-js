import {
  Button,
  Container,
  Flex,
  Group,
  TextInput,
  Title,
} from "@mantine/core";
import Navbar from "../components/navbar";
import IconSearch from "../components/icons/icon-search";

export default function IndexPage() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Flex direction={"column"} gap={"md"} justify={"center"} align={"center"}>
        <Title>Forum App</Title>
        <TextInput
          placeholder="Search..."
          rightSection={<IconSearch />}
          rightSectionPointerEvents="none"
          w={400}
        />

        <Title order={3}>Top Category</Title>
        <Navbar />
      </Flex>
    </div>
  );
}
