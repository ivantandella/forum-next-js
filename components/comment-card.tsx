import { Button, Card, Group, Image, Text } from "@mantine/core";
import IconThumbUp from "./icons/icon-thumb-up";
import IconThumbDown from "./icons/icon-thumb-down";
import { timeAgo } from "../utils/date";
import Author from "./author";
import { CommentType } from "../api-hooks/threads/model";
import { useComment } from "../hooks/use-comments";

type CommentCardPropsType = {
  threadId: string;
  comment: CommentType;
};

export default function CommentCard(props: CommentCardPropsType) {
  const { comment, threadId } = props;
  const {
    isPending,
    upVoted,
    downVoted,
    handleUpVote,
    handleDownVote,
    handleNeutralVote,
    commentThumbDown,
    commentThumbUp,
  } = useComment(threadId, comment);

  return (
    <Card key={comment.id} withBorder w={"100%"} shadow="sm" mb={10}>
      <Author name={comment.owner.name} avatar={comment.owner.avatar}>
        <Text size="sm">({timeAgo(comment.createdAt)})</Text>
      </Author>
      <Text>
        <div dangerouslySetInnerHTML={{ __html: comment.content }} />
      </Text>
      <Group mt={20}>
        <Group gap={2}>
          <Button
            disabled={isPending}
            size="xs"
            p={0}
            variant="transparent"
            color="black"
            onClick={upVoted ? handleNeutralVote : handleUpVote}
          >
            <IconThumbUp fill={commentThumbUp} />
          </Button>
          {comment.upVotesBy.length || "0"}
        </Group>

        <Group gap={2}>
          <Button
            disabled={isPending}
            size="xs"
            p={0}
            variant="transparent"
            color="black"
            onClick={downVoted ? handleNeutralVote : handleDownVote}
          >
            <IconThumbDown fill={commentThumbDown} />
          </Button>
          {comment.downVotesBy.length || "0"}
        </Group>
      </Group>
    </Card>
  );
}
