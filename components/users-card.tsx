import { Card, Flex, Group, Image, Text, Title } from "@mantine/core";
import { useResponsive } from "../hooks/use-responsive";

type UserCardPropsType = {
  name: string;
  mail: string;
  score?: number;
  avatar: string;
};

export default function UserCard(props: UserCardPropsType) {
  const { avatar, name, mail, score } = props;
  const { elemWidth } = useResponsive();

  return (
    <Card withBorder shadow="sm" radius={"md"} w={elemWidth}>
      <Flex justify={"space-between"} align={"center"}>
        <Group
          styles={() => ({
            root: {
              flexWrap: "nowrap",
            },
          })}
        >
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
