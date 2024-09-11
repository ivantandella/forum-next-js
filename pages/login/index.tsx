import {
  Button,
  Card,
  Flex,
  Image,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import {
  DANGER_COLOR,
  HOME_PATH,
  PRIMARY_COLOR_1,
  PRIMARY_COLOR_2,
  REGISTER_PATH,
  SUCCESS_COLOR,
} from "../../utils/constants";
import Link from "next/link";
import * as Yup from "yup";
import { useForm, yupResolver } from "@mantine/form";
import { useLogin } from "../../api-hooks/auth/mutation";
import { LoginDataType } from "../../api-hooks/auth/model";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";

export default function LoginPage() {
  const { mutateAsync, isPending } = useLogin();
  const { push } = useRouter();

  const schema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters long"),
  });

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: yupResolver(schema),
  });

  async function handleSubmitLogin(values: LoginDataType) {
    try {
      const response = await mutateAsync(values);
      localStorage.setItem("token", response.data.token);
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
    <Flex justify={"center"} align={"center"} mih={"100vh"} bg={"gray"}>
      <Card withBorder radius={"md"} w={"30%"} my={10}>
        <form onSubmit={form.onSubmit((values) => handleSubmitLogin(values))}>
          <Flex direction={"column"} gap={"md"} align={"center"}>
            <Image
              src={"/forum-logo.png"}
              alt="Forum Logo"
              w={100}
              h={100}
              radius={"100%"}
            />
            <Title>Login</Title>
            <Text size="sm">
              Don't have an account?{" "}
              <Link href={REGISTER_PATH} className="link">
                Register
              </Link>
            </Text>
            <TextInput
              label="Email"
              placeholder="example@mail.com"
              w={"100%"}
              size="md"
              key={form.key("email")}
              {...form.getInputProps("email")}
            />
            <PasswordInput
              label="Password"
              placeholder="******"
              w={"100%"}
              size="md"
              key={form.key("password")}
              {...form.getInputProps("password")}
            />
            <Button
              type="submit"
              loading={isPending}
              variant="gradient"
              gradient={{
                from: PRIMARY_COLOR_1,
                to: PRIMARY_COLOR_2,
                deg: 180,
              }}
              w={"100%"}
            >
              Login
            </Button>
          </Flex>
        </form>
      </Card>
    </Flex>
  );
}
