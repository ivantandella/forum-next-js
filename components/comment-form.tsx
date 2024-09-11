import { Button, Textarea } from "@mantine/core";
import {
  DANGER_COLOR,
  PRIMARY_COLOR_1,
  PRIMARY_COLOR_2,
  SUCCESS_COLOR,
} from "../utils/constants";
import * as Yup from "yup";
import { useForm, yupResolver } from "@mantine/form";
import { CommentInputType } from "../api-hooks/threads/model";
import { useCreateComment } from "../api-hooks/threads/mutation";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { getToken } from "../utils/token";

type CommentFormPropsType = {
  threadId: string;
};

export default function CommentForm(props: CommentFormPropsType) {
  const { threadId } = props;
  const { mutateAsync, isPending } = useCreateComment(threadId);
  const { refresh } = useRouter();
  const isLogin = getToken();

  const schema = Yup.object({
    content: Yup.string().required("Please fill the comment first!"),
  });

  const form = useForm({
    initialValues: {
      content: "",
    },
    validate: yupResolver(schema),
  });

  async function handleSubmitComment(values: CommentInputType) {
    try {
      const response = await mutateAsync(values);
      form.reset();
      refresh();
    } catch (error: any) {
      console.error(error);
      notifications.show({
        title: error.response.data.status.toUpperCase(),
        message: error.response.data.message,
        position: "top-right",
        autoClose: 5000,
        color: DANGER_COLOR,
      });
    }
    console.log(values, threadId);
  }

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmitComment(values))}>
      <Textarea
        placeholder={isLogin ? "Leave a comment" : "Please login first"}
        disabled={!isLogin}
        key={form.key("content")}
        {...form.getInputProps("content")}
      />
      <Button
        type="submit"
        size="xs"
        mt={10}
        variant="gradient"
        gradient={{
          from: PRIMARY_COLOR_1,
          to: PRIMARY_COLOR_2,
          deg: 180,
        }}
        loading={isPending}
        disabled={!isLogin}
      >
        Send
      </Button>
    </form>
  );
}
