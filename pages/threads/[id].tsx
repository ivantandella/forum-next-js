import { useRouter } from "next/router";
import Navbar from "../../components/navbar";
import {
  Button,
  Card,
  Flex,
  Group,
  Image,
  Loader,
  Text,
  Textarea,
  Title,
} from "@mantine/core";
import IconThumbDown from "../../components/icons/icon-thumb-down";
import IconThumbUp from "../../components/icons/icon-thumb-up";
import { PRIMARY_COLOR_1, PRIMARY_COLOR_2 } from "../../utils/constants";
import { useGetDetailThread } from "../../api-hooks/threads/query";
import { timeAgo } from "../../utils/date";
import { DetailThreadType } from "../../api-hooks/threads/model";
import CommentCard from "../../components/comment-card";
import Author from "../../components/author";

export default function DetailThread() {
  const { query } = useRouter();
  const id = query.id as string;
  const { data, isLoading } = useGetDetailThread(id);
  const threadData: DetailThreadType = data?.data?.detailThread || {};

  console.log(threadData);
  return (
    <>
      <Flex
        direction={"column"}
        justify={"center"}
        align={"center"}
        mih={"100vh"}
        p={20}
        mb={80}
      >
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Card w={600}>
              <Flex
                direction={"row"}
                justify={"space-between"}
                align={"center"}
              >
                <Title order={4}>{threadData.title}</Title>
                <Text size="sm">{timeAgo(threadData.createdAt)}</Text>
              </Flex>
              <Author
                name={threadData.owner.name}
                avatar={threadData.owner.avatar}
              />
              <Text>
                <div dangerouslySetInnerHTML={{ __html: threadData.body }} />
              </Text>
              <Group mt={20}>
                <Group gap={2}>
                  <IconThumbUp /> {threadData.upVotesBy.length || "0"}
                </Group>
                <Group gap={2}>
                  <IconThumbDown /> {threadData.downVotesBy.length || "0"}
                </Group>
              </Group>
              <Text mt={20}>Comment:</Text>
              <form>
                <Textarea placeholder="Write a comment" />
                <Button
                  size="xs"
                  mt={10}
                  variant="gradient"
                  gradient={{
                    from: PRIMARY_COLOR_1,
                    to: PRIMARY_COLOR_2,
                    deg: 180,
                  }}
                >
                  Send
                </Button>
              </form>
            </Card>

            <Card w={600}>
              <Title order={3} mb={10}>
                Comments ({threadData.comments.length})
              </Title>
              {threadData.comments.length > 0 &&
                threadData.comments.map((comment) => (
                  <CommentCard key={comment.id} comment={comment} />
                ))}
            </Card>
          </>
        )}
      </Flex>
      <Navbar />
    </>
  );
}
