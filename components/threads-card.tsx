import { Card, Flex, Group, Image, Text, Title } from "@mantine/core";
import IconUserCircle from "./icons/icon-user-circle";
import IconThumbUp from "./icons/icon-thumb-up";
import IconThumbDown from "./icons/icon-thumb-down";
import IconMessage from "./icons/icon-message";
import { ThreadType } from "../api-hooks/threads/model";
import { timeAgo } from "../utils/date";
import { useGetAllUsers } from "../api-hooks/auth/query";
import { UserType } from "../api-hooks/auth/model";

interface ThreadsCardPropsType {
  data: ThreadType;
}

export default function ThreadsCard(props: ThreadsCardPropsType) {
  const {
    body,
    title,
    createdAt,
    downVotesBy,
    upVotesBy,
    totalComments,
    ownerId,
  } = props.data;

  const { data } = useGetAllUsers();
  const usersData: UserType[] = data?.data?.users || [];
  const author = usersData.find((user) => user.id === ownerId);

  return (
    <Card withBorder mb={10} w={400} shadow="sm">
      <Flex direction={"row"} justify={"space-between"} align={"center"}>
        <Group my={10} gap={"xs"}>
          <Image
            src={author?.avatar}
            alt={author?.name}
            w={20}
            h={20}
            radius={"100%"}
          />{" "}
          {author?.name}
        </Group>
        <Text size="sm">{timeAgo(createdAt)}</Text>
      </Flex>
      <Title order={4}>{title}</Title>
      <Text>{body}</Text>
      <Group mt={20}>
        <Group gap={2}>
          <IconThumbUp /> {upVotesBy.length || "0"}
        </Group>
        <Group gap={2}>
          <IconThumbDown /> {downVotesBy.length || "0"}
        </Group>
        <Group gap={2}>
          <IconMessage /> {totalComments || "0"}
        </Group>
      </Group>
    </Card>
  );
}
