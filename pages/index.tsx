import { Button, Card, Flex, Group, Text, Title } from "@mantine/core";
import Navbar from "../components/navbar";
import Header from "../components/header";
import IconUserCircle from "../components/icons/icon-user-circle";
import IconThumbUp from "../components/icons/icon-thumb-up";
import IconThumbDown from "../components/icons/icon-thumb-down";
import IconMessage from "../components/icons/icon-message";

export default function IndexPage() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Header />

      <Flex
        direction={"column"}
        gap={"md"}
        justify={"center"}
        align={"center"}
        mt={120}
        mb={20}
      >
        <Title order={3}>Top Category</Title>
        <Flex direction={"row"} gap={"md"}>
          <Button variant="outline" color="gray">
            #abc
          </Button>
          <Button variant="outline" color="gray">
            #abc
          </Button>
        </Flex>
      </Flex>

      <Flex
        direction={"column"}
        gap={"md"}
        justify={"center"}
        align={"center"}
        mb={80}
      >
        <Card withBorder mb={10} w={400}>
          <Flex direction={"row"} justify={"space-between"} align={"center"}>
            <Group my={10} gap={"xs"}>
              <IconUserCircle /> Ivan
            </Group>
            <Text size="sm">12/02/2022</Text>
          </Flex>
          <Title order={4}>Forum</Title>
          <Text>Forum description</Text>
          <Group mt={20}>
            <Group gap={2}>
              <IconThumbUp /> 0
            </Group>
            <Group gap={2}>
              <IconThumbDown /> 0
            </Group>
            <Group gap={2}>
              <IconMessage /> 0
            </Group>
          </Group>
        </Card>
        <Card withBorder mb={10} w={400}>
          <Flex direction={"row"} justify={"space-between"} align={"center"}>
            <Group my={10} gap={"xs"}>
              <IconUserCircle /> Ivan
            </Group>
            <Text size="sm">12/02/2022</Text>
          </Flex>
          <Title order={4}>Forum</Title>
          <Text>Forum description</Text>
          <Group mt={20}>
            <Group gap={2}>
              <IconThumbUp /> 0
            </Group>
            <Group gap={2}>
              <IconThumbDown /> 0
            </Group>
            <Group gap={2}>
              <IconMessage /> 0
            </Group>
          </Group>
        </Card>
        <Card withBorder mb={10} w={400}>
          <Flex direction={"row"} justify={"space-between"} align={"center"}>
            <Group my={10} gap={"xs"}>
              <IconUserCircle /> Ivan
            </Group>
            <Text size="sm">12/02/2022</Text>
          </Flex>
          <Title order={4}>Forum</Title>
          <Text>Forum description</Text>
          <Group mt={20}>
            <Group gap={2}>
              <IconThumbUp /> 0
            </Group>
            <Group gap={2}>
              <IconThumbDown /> 0
            </Group>
            <Group gap={2}>
              <IconMessage /> 0
            </Group>
          </Group>
        </Card>
      </Flex>

      <Navbar />
    </div>
  );
}
