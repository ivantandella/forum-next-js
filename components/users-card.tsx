import { Card, Flex, Group, Image, Text, Title } from "@mantine/core";

type UserCardPropsType = {
  name: string;
  mail: string;
  score?: number;
  avatar: string;
};

export default function UserCard(props: UserCardPropsType) {
  const { avatar, name, mail, score } = props;
  return (
    <Card withBorder shadow="sm" radius={"md"} w={400}>
      <Flex justify={"space-between"} align={"center"}>
        <Group>
          <Image src={avatar} alt={name} radius={"md"} w={70} h={70} />
          <div>
            <Title order={4}>{name}</Title>
            <Text size="sm">{mail}</Text>
          </div>
        </Group>
        <Text fw={"bold"}>{score}</Text>
      </Flex>
    </Card>
  );
}
