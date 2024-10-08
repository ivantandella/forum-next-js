import { useRouter } from "next/router";
import Navbar from "../../components/navbar";
import { Card, Flex, Group, Loader, Text, Title } from "@mantine/core";
import { useGetDetailThread } from "../../api-hooks/threads/query";
import { timeAgo } from "../../utils/date";
import { DetailThreadType } from "../../api-hooks/threads/model";
import CommentCard from "../../components/comment-card";
import Author from "../../components/author";
import CommentForm from "../../components/comment-form";
import ThreadAction from "../../components/thread-action";
import { useMediaQuery } from "@mantine/hooks";

export default function DetailThread() {
  const { query } = useRouter();
  const id = query.id as string;
  const { data, isLoading } = useGetDetailThread(id);
  const threadData: DetailThreadType = data?.data?.detailThread || {};
  const matches = useMediaQuery(`(min-width: 640px)`);
  const detailWidth = matches ? 600 : 350;

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
            <Card w={detailWidth}>
              {matches ? (
                <Flex
                  direction={"row"}
                  justify={"space-between"}
                  align={"center"}
                >
                  <Title order={4}>{threadData.title}</Title>
                  <Text size="sm">{timeAgo(threadData.createdAt)}</Text>
                </Flex>
              ) : (
                <>
                  <Title order={4}>{threadData.title}</Title>
                  <Text size="sm">{timeAgo(threadData.createdAt)}</Text>
                </>
              )}
              <Author
                name={threadData.owner.name}
                avatar={threadData.owner.avatar}
              />
              <Text>
                <div dangerouslySetInnerHTML={{ __html: threadData.body }} />
              </Text>

              <Group my={20}>
                <ThreadAction
                  id={id}
                  upVotesBy={threadData.upVotesBy}
                  downVotesBy={threadData.downVotesBy}
                />
              </Group>
              <CommentForm threadId={threadData.id} />
            </Card>

            <Card w={detailWidth}>
              <Title order={3} mb={10}>
                Comments ({threadData.comments.length})
              </Title>
              {threadData.comments.length > 0 &&
                threadData.comments.map((comment) => (
                  <CommentCard
                    key={comment.id}
                    comment={comment}
                    threadId={threadData.id}
                  />
                ))}
            </Card>
          </>
        )}
      </Flex>
      <Navbar />
    </>
  );
}
