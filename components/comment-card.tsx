import { Card, Group, Image, Text } from "@mantine/core";
import IconThumbUp from "./icons/icon-thumb-up";
import IconThumbDown from "./icons/icon-thumb-down";
import { timeAgo } from "../utils/date";
import Author from "./author";

type CommentCardPropsType = {
  comment: {
    id: string;
    content: string;
    createdAt: string;
    owner: {
      id: string;
      name: string;
      avatar: string;
    };
    upVotesBy: string[];
    downVotesBy: string[];
  };
};

export default function CommentCard(props: CommentCardPropsType) {
  const { comment } = props;

  return (
    <Card key={comment.id} withBorder w={"100%"} shadow="sm">
      <Author name={comment.owner.name} avatar={comment.owner.avatar}>
        <Text size="sm">({timeAgo(comment.createdAt)})</Text>
      </Author>
      <Text>
        <div dangerouslySetInnerHTML={{ __html: comment.content }} />
      </Text>
      <Group mt={20}>
        <Group gap={2}>
          <IconThumbUp /> {comment.upVotesBy.length || "0"}
        </Group>
        <Group gap={2}>
          <IconThumbDown /> {comment.downVotesBy.length || "0"}
        </Group>
      </Group>
    </Card>
  );
}
