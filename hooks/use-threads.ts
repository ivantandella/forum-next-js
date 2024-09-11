import { useState } from "react";
import { useVoteThread } from "../api-hooks/threads/mutation";
import { VoteTypeEnum } from "../api-hooks/threads/model";
import { notifications } from "@mantine/notifications";
import { queryClient, SUCCESS_COLOR } from "../utils/constants";
import { threadsKey } from "../api-hooks/threads/query";

export function useThreads(id: string) {
  const { mutateAsync, isPending } = useVoteThread(id);
  const [fillThumbUp, setFillThumbUp] = useState("none");
  const [fillThumbDown, setFillThumbDown] = useState("none");

  async function handleUpVote() {
    try {
      const response = await mutateAsync(VoteTypeEnum.UP);
      setFillThumbUp("fill");
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
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDownVote() {
    // const queryData = queryClient.getQueryData(threadsKey.getAllThreadsKey);

    try {
      const response = await mutateAsync(VoteTypeEnum.DOWN);
      setFillThumbDown("fill");
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
    } catch (error) {
      // queryClient.setQueryData(threadsKey.getAllThreadsKey, queryData);
      console.error(error);
    }
  }

  async function handleNeutralVote() {
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
    } catch (error) {
      console.error(error);
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
