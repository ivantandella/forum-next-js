import { Card, Flex, Group, Image, Text, Title } from "@mantine/core";
import IconThumbUp from "./icons/icon-thumb-up";
import IconThumbDown from "./icons/icon-thumb-down";
import IconMessage from "./icons/icon-message";
import { ThreadType } from "../api-hooks/threads/model";
import { timeAgo } from "../utils/date";
import { useGetAllUsers } from "../api-hooks/auth/query";
import { UserType } from "../api-hooks/auth/model";
import Link from "next/link";
import Author from "./author";

interface ThreadsCardPropsType {
  data: ThreadType;
}

export default function ThreadsCard(props: ThreadsCardPropsType) {
  const {
    id,
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
      <Link
        href={`/threads/${id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <Flex direction={"row"} justify={"space-between"} align={"center"}>
          <Author name={author?.name} avatar={author?.avatar} />

          <Text size="sm">{timeAgo(createdAt)}</Text>
        </Flex>
        <Title order={4}>{title}</Title>
        <Text>
          <div dangerouslySetInnerHTML={{ __html: body }} />
        </Text>
      </Link>

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
