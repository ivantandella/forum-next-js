import { Button, Group } from "@mantine/core";
import IconThumbUp from "./icons/icon-thumb-up";
import IconThumbDown from "./icons/icon-thumb-down";
import { useThreads } from "../hooks/use-threads";
import { useGetMe } from "../api-hooks/auth/query";
import { useEffect } from "react";
import { PRIMARY_COLOR_1, PRIMARY_COLOR_2 } from "../utils/constants";

type ThreadActionPropsType = {
  id: string;
  upVotesBy: string[];
  downVotesBy: string[];
};

export default function ThreadAction(props: ThreadActionPropsType) {
  const { id, upVotesBy, downVotesBy } = props;
  const {
    fillThumbDown,
    setFillThumbUp,
    setFillThumbDown,
    fillThumbUp,
    handleUpVote,
    handleDownVote,
    handleNeutralVote,
    isPending,
  } = useThreads(id);

  const me = useGetMe();
  const myId = me.data?.data?.user?.id;
  const upVoted = upVotesBy.includes(myId);
  const downVoted = downVotesBy.includes(myId);

  useEffect(() => {
    if (upVoted) {
      setFillThumbUp(PRIMARY_COLOR_2);
    } else {
      setFillThumbUp("none");
    }
    if (downVoted) {
      setFillThumbDown(PRIMARY_COLOR_1);
    } else {
      setFillThumbDown("none");
    }
  }, [upVoted, downVoted]);

  return (
    <>
      <Group gap={2}>
        <Button
          disabled={isPending}
          size="xs"
          p={0}
          variant="transparent"
          color="black"
          onClick={upVoted ? handleNeutralVote : handleUpVote}
        >
          <IconThumbUp fill={fillThumbUp} />
        </Button>
        {upVotesBy.length || "0"}
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
          <IconThumbDown fill={fillThumbDown} />
        </Button>
        {downVotesBy.length || "0"}
      </Group>
    </>
  );
}
