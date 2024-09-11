import { useEffect, useState } from "react";
import { useGetMe } from "../api-hooks/auth/query";
import { useVoteComment } from "../api-hooks/threads/mutation";
import { CommentType, VoteTypeEnum } from "../api-hooks/threads/model";
import { notifications } from "@mantine/notifications";
import { queryClient, SUCCESS_COLOR } from "../utils/constants";
import { threadsKey } from "../api-hooks/threads/query";

export function useComment(threadId: string, comment: CommentType) {
  const { mutateAsync, isPending } = useVoteComment(threadId, comment.id);
  const [commentThumbUp, setCommentThumbUp] = useState("none");
  const [commentThumbDown, setCommentThumbDown] = useState("none");

  const me = useGetMe();
  const myId = me.data?.data?.user?.id;
  const upVoted = comment.upVotesBy.includes(myId);
  const downVoted = comment.downVotesBy.includes(myId);

  useEffect(() => {
    if (upVoted) {
      setCommentThumbUp("fill");
    } else {
      setCommentThumbUp("none");
    }
    if (downVoted) {
      setCommentThumbDown("fill");
    } else {
      setCommentThumbDown("none");
    }
  }, [upVoted, downVoted]);

  async function handleUpVote() {
    try {
      const response = await mutateAsync(VoteTypeEnum.UP);
      setCommentThumbUp("fill");
      setCommentThumbDown("none");
      console.log(response);

      notifications.show({
        title: response.status.toUpperCase(),
        message: response.message,
        position: "top-right",
        autoClose: 1000,
        color: SUCCESS_COLOR,
      });

      queryClient.refetchQueries({
        queryKey: threadsKey.getDetailThreadKey(threadId),
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDownVote() {
    try {
      const response = await mutateAsync(VoteTypeEnum.DOWN);
      setCommentThumbDown("fill");
      setCommentThumbUp("none");
      console.log(response);

      notifications.show({
        title: response.status.toUpperCase(),
        message: response.message,
        position: "top-right",
        autoClose: 1000,
        color: SUCCESS_COLOR,
      });

      queryClient.refetchQueries({
        queryKey: threadsKey.getAllThreadsKey,
      });

      queryClient.refetchQueries({
        queryKey: threadsKey.getDetailThreadKey(threadId),
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function handleNeutralVote() {
    try {
      const response = await mutateAsync(VoteTypeEnum.NEUTRAL);
      setCommentThumbUp("none");
      setCommentThumbDown("none");
      console.log(response);

      notifications.show({
        title: response.status.toUpperCase(),
        message: response.message,
        position: "top-right",
        autoClose: 1000,
        color: SUCCESS_COLOR,
      });

      queryClient.refetchQueries({
        queryKey: threadsKey.getAllThreadsKey,
      });

      queryClient.refetchQueries({
        queryKey: threadsKey.getDetailThreadKey(threadId),
      });
    } catch (error) {
      console.error(error);
    }
  }

  return {
    commentThumbUp,
    commentThumbDown,
    isPending,
    upVoted,
    downVoted,
    setCommentThumbDown,
    setCommentThumbUp,
    handleUpVote,
    handleDownVote,
    handleNeutralVote,
  };
}
