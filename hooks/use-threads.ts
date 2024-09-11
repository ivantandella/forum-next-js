import { useState } from "react";
import { useVoteThread } from "../api-hooks/threads/mutation";
import { VoteTypeEnum } from "../api-hooks/threads/model";
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
import { useGetMe } from "../api-hooks/auth/query";

export function useThreads(id: string) {
  const { mutateAsync, isPending } = useVoteThread(id);
  const [fillThumbUp, setFillThumbUp] = useState("none");
  const [fillThumbDown, setFillThumbDown] = useState("none");
  const { isLogin } = useAuth();

  const me = useGetMe();
  const myId = me.data?.data?.user?.id;

  async function handleUpVote() {
    isLogin();
    if (!myId) return;

    try {
      const response = await mutateAsync(VoteTypeEnum.UP);
      setFillThumbUp(PRIMARY_COLOR_2);
      setFillThumbDown("none");
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
        queryKey: threadsKey.getDetailThreadKey(id),
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
    // const queryData = queryClient.getQueryData(threadsKey.getAllThreadsKey);
    isLogin();
    if (!myId) return;
    try {
      const response = await mutateAsync(VoteTypeEnum.DOWN);
      setFillThumbDown(PRIMARY_COLOR_1);
      setFillThumbUp("none");
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
        queryKey: threadsKey.getDetailThreadKey(id),
      });
    } catch (error: any) {
      // queryClient.setQueryData(threadsKey.getAllThreadsKey, queryData);
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
    if (!myId) return;
    try {
      const response = await mutateAsync(VoteTypeEnum.NEUTRAL);
      setFillThumbUp("none");
      setFillThumbDown("none");
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
        queryKey: threadsKey.getDetailThreadKey(id),
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
    fillThumbUp,
    setFillThumbUp,
    fillThumbDown,
    setFillThumbDown,
    handleUpVote,
    handleDownVote,
    handleNeutralVote,
    isPending,
  };
}
