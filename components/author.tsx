import { Group, Image, Text } from "@mantine/core";

type AuthorPropsType = {
  name?: string;
  avatar?: string;
  children?: React.ReactNode;
};

export default function Author(props: AuthorPropsType) {
  const { avatar, name, children } = props;

  return (
    <Group my={10} gap={"xs"}>
      <Image src={avatar} alt={name} w={20} h={20} radius={"100%"} />
      <Text>{name}</Text> {children}
    </Group>
  );
}
