import { useEffect, useState } from "react";
import { useGetMe } from "../api-hooks/auth/query";
import { useVoteComment } from "../api-hooks/threads/mutation";
import { CommentType, VoteTypeEnum } from "../api-hooks/threads/model";
import { notifications } from "@mantine/notifications";
import {
  DANGER_COLOR,
  PRIMARY_COLOR_1,
  PRIMARY_COLOR_2,
  queryClient,
  SUCCESS_COLOR,
} from "../utils/constants";
import { threadsKey } from "../api-hooks/threads/query";
import { useAuth } from "./auth";

export function useComment(threadId: string, comment: CommentType) {
  const { mutateAsync, isPending } = useVoteComment(threadId, comment.id);
  const [commentThumbUp, setCommentThumbUp] = useState("none");
  const [commentThumbDown, setCommentThumbDown] = useState("none");
  const { isLogin } = useAuth();

  const me = useGetMe();
  const myId = me.data?.data?.user?.id;
  const upVoted = comment.upVotesBy.includes(myId);
  const downVoted = comment.downVotesBy.includes(myId);

  useEffect(() => {
    if (upVoted) {
      setCommentThumbUp(PRIMARY_COLOR_2);
    } else {
      setCommentThumbUp("none");
    }
    if (downVoted) {
      setCommentThumbDown(PRIMARY_COLOR_1);
    } else {
      setCommentThumbDown("none");
    }
  }, [upVoted, downVoted]);

  async function handleUpVote() {
    isLogin();
    try {
      const response = await mutateAsync(VoteTypeEnum.UP);
      setCommentThumbUp(PRIMARY_COLOR_2);
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
    } catch (error: any) {
      console.error(error);
      notifications.show({
        title: error.response.data.status.toUpperCase(),
        message: error.response.data.message,
        position: "top-right",
        autoClose: 1000,
        color: DANGER_COLOR,
      });
    }
  }

  async function handleDownVote() {
    isLogin();
    try {
      const response = await mutateAsync(VoteTypeEnum.DOWN);
      setCommentThumbDown(PRIMARY_COLOR_1);
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
    } catch (error: any) {
      console.error(error);
      notifications.show({
        title: error.response.data.status.toUpperCase(),
        message: error.response.data.message,
        position: "top-right",
        autoClose: 1000,
        color: DANGER_COLOR,
      });
    }
  }

  async function handleNeutralVote() {
    isLogin();
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
    } catch (error: any) {
      console.error(error);
      notifications.show({
        title: error.response.data.status.toUpperCase(),
        message: error.response.data.message,
        position: "top-right",
        autoClose: 1000,
        color: DANGER_COLOR,
      });
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
