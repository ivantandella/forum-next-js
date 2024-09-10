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
import { PRIMARY_COLOR_1, PRIMARY_COLOR_2 } from "../../utils/constants";
import Link from "next/link";
import * as Yup from "yup";
import { useForm, yupResolver } from "@mantine/form";
import { useLogin } from "../../api-hooks/auth/mutation";
import { LoginDataType } from "../../api-hooks/auth/model";
import { redirect, useRouter } from "next/navigation";

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

  function handleSubmitLogin(values: LoginDataType) {
    mutateAsync(values, {
      onSuccess: (response) => {
        localStorage.setItem("token", response.data.token);
        form.reset();
        push("/");
      },
      onError: (error) => {
        console.log(error);
      },
    });
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
              Don't have an account? <Link href="/register">Register</Link>
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
