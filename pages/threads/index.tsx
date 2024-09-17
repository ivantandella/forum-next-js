import { Button, Card, Flex, Textarea, TextInput, Title } from "@mantine/core";
import Navbar from "../../components/navbar";
import {
  DANGER_COLOR,
  HOME_PATH,
  PRIMARY_COLOR_1,
  PRIMARY_COLOR_2,
  SUCCESS_COLOR,
} from "../../utils/constants";
import * as Yup from "yup";
import { useForm, yupResolver } from "@mantine/form";
import { useCreateThread } from "../../api-hooks/threads/mutation";
import { CreateThreadInputType } from "../../api-hooks/threads/model";
import { useRouter } from "next/router";
import { notifications } from "@mantine/notifications";
import { useEffect } from "react";
import { useAuth } from "../../hooks/use-auth";
import { useResponsive } from "../../hooks/use-responsive";

export default function AddThread() {
  const { mutateAsync, isPending } = useCreateThread();
  const { push } = useRouter();
  const { checkLogin } = useAuth();
  const { elemWidth } = useResponsive();

  useEffect(() => {
    checkLogin();
  }, []);

  const schema = Yup.object({
    title: Yup.string().required("Title is required"),
    category: Yup.string().required("Category is required"),
    body: Yup.string().required("Description is required"),
  });

  const form = useForm({
    initialValues: {
      title: "",
      category: "",
      body: "",
    },
    validate: yupResolver(schema),
  });

  async function handleCreateThread(values: CreateThreadInputType) {
    try {
      const response = await mutateAsync(values);
      form.reset();
      push(HOME_PATH);

      notifications.show({
        title: response.status.toUpperCase(),
        message: response.message,
        position: "top-right",
        autoClose: 5000,
        color: SUCCESS_COLOR,
      });
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
  }

  return (
    <>
      <Flex justify={"center"} align={"center"} mih={"100vh"} p={20}>
        <Card withBorder w={elemWidth} mb={80} shadow="sm">
          <form
            onSubmit={form.onSubmit((values) => handleCreateThread(values))}
          >
            <Flex direction={"column"} gap={"md"} align={"center"}>
              <Title order={2} mb={20}>
                Add Your Thread
              </Title>
              <TextInput
                label="Title"
                placeholder="insert title"
                w={"100%"}
                size="md"
                key={form.key("title")}
                {...form.getInputProps("title")}
              />
              <TextInput
                label="Category"
                placeholder="insert category"
                w={"100%"}
                size="md"
                key={form.key("category")}
                {...form.getInputProps("category")}
              />
              <Textarea
                label="Description"
                placeholder="insert description"
                w={"100%"}
                size="md"
                key={form.key("body")}
                {...form.getInputProps("body")}
              />
              <Button
                type="submit"
                variant="gradient"
                gradient={{
                  from: PRIMARY_COLOR_1,
                  to: PRIMARY_COLOR_2,
                  deg: 180,
                }}
                w={"100%"}
                loading={isPending}
              >
                Create
              </Button>
            </Flex>
          </form>
        </Card>
      </Flex>
      <Navbar />
    </>
  );
}
